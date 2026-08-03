(() => {
  const CURRENT_KEY = "rosyMindsGardenV1";
  const NEWER_KEY = "rosyMindsGardenStateV1";
  const LEGACY_KEY = "rosyMindsGardenV3";
  const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=100090055060602";
  const REPAIR_FLAG = "rosyGardenRepairV3";

  function readState(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }

  function validDates(values) {
    return Array.isArray(values) ? values.filter((value) => typeof value === "string") : [];
  }

  function validCollected(values) {
    return Array.isArray(values)
      ? values.filter(Number.isInteger).filter((value) => value >= 0 && value < 30)
      : [];
  }

  function repairSavedProgress() {
    const current = readState(CURRENT_KEY);
    const newer = readState(NEWER_KEY);
    const legacy = readState(LEGACY_KEY);

    const completed = [...new Set([
      ...validDates(current.completed),
      ...validDates(newer.completedDates),
      ...validDates(legacy.completed)
    ])].slice(-365);

    const savedCollected = [...new Set([
      ...validCollected(current.collected),
      ...validCollected(newer.collected),
      ...validCollected(legacy.collected)
    ])];

    const unlockedCount = Math.min(30, Math.max(completed.length, savedCollected.length));
    const collected = Array.from({ length: unlockedCount }, (_, index) => index);

    const petals = {
      ...(legacy.petals && typeof legacy.petals === "object" ? legacy.petals : {}),
      ...(newer.petalByDate && typeof newer.petalByDate === "object" ? newer.petalByDate : {}),
      ...(current.petals && typeof current.petals === "object" ? current.petals : {})
    };

    const repaired = { completed, collected, petals };
    const before = JSON.stringify({
      completed: validDates(current.completed),
      collected: validCollected(current.collected),
      petals: current.petals && typeof current.petals === "object" ? current.petals : {}
    });
    const after = JSON.stringify(repaired);

    if (before === after) {
      sessionStorage.removeItem(REPAIR_FLAG);
      return false;
    }

    localStorage.setItem(CURRENT_KEY, after);
    return true;
  }

  function buildInstallHelp() {
    let modal = document.getElementById("rosyInstallHelp");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "rosyInstallHelp";
    modal.className = "modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "rosyInstallTitle");
    modal.innerHTML = `
      <div class="modal-backdrop" data-install-close></div>
      <div class="modal-card" style="text-align:left">
        <button class="modal-close" type="button" data-install-close aria-label="Close">×</button>
        <div aria-hidden="true" style="display:grid;place-items:center;width:68px;height:68px;margin:0 auto 12px;border-radius:22px;color:#6f3652;background:linear-gradient(145deg,#fff,#f8e8ee);box-shadow:0 8px 24px rgba(79,49,68,.11);font-size:2.25rem;font-weight:700">＋</div>
        <p class="eyebrow" style="text-align:center">ADD THE GARDEN TO YOUR PHONE</p>
        <h2 id="rosyInstallTitle" style="text-align:center">Keep your daily moment one tap away.</h2>
        <div style="display:grid;gap:12px;margin:20px 0 15px">
          <div style="padding:15px;border-radius:16px;color:#726772;background:rgba(255,255,255,.76);line-height:1.58">
            <strong style="color:#6f3652">On iPhone or iPad</strong><br>
            Open the garden in <strong>Safari</strong>. Tap the <strong>Share</strong> symbol—the square with the upward arrow. Scroll down and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
          </div>
          <div style="padding:15px;border-radius:16px;color:#726772;background:rgba(255,255,255,.76);line-height:1.58">
            <strong style="color:#6f3652">On Android</strong><br>
            Open the browser menu, then choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.
          </div>
        </div>
        <p style="text-align:center;color:#726772;font-size:.84rem;line-height:1.55">The Rosy Minds Garden icon will appear on the Home Screen like an app. Progress stays on this device.</p>
        <button class="primary-button" type="button" data-install-close style="width:100%">Got It</button>
      </div>`;

    document.body.appendChild(modal);

    const close = () => {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    };

    modal.querySelectorAll("[data-install-close]").forEach((control) => {
      control.addEventListener("click", close);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) close();
    });

    return modal;
  }

  function restoreTopInstallButton() {
    const oldButton = document.getElementById("installButton");
    if (!oldButton) return;

    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    if (standalone) {
      oldButton.hidden = true;
      return;
    }

    const button = oldButton.cloneNode(true);
    button.hidden = false;
    button.innerHTML = '<span aria-hidden="true">＋</span> Add to Home Screen';
    button.setAttribute("aria-label", "Show instructions for adding Rosy Minds Garden to the Home Screen");
    oldButton.replaceWith(button);

    button.addEventListener("click", () => {
      const modal = buildInstallHelp();
      modal.hidden = false;
      document.body.classList.add("modal-open");
      requestAnimationFrame(() => modal.querySelector("[data-install-close]").focus());
    });
  }

  function nativeShare() {
    const text = "Come spend one gentle minute with Jesus in ROSY MINDS GARDEN: A Daily Moment with Jesus. 🌹";
    const data = { title: "ROSY MINDS GARDEN", text, url: window.location.href.split("?")[0] };
    const status = document.getElementById("shareStatus");

    if (navigator.share) {
      navigator.share(data).catch((error) => {
        if (error && error.name !== "AbortError" && status) status.textContent = "Use your browser’s Share button to send the garden.";
      });
      return;
    }

    navigator.clipboard.writeText(`${text} ${data.url}`).then(() => {
      if (status) status.textContent = "The garden message and link were copied.";
    }).catch(() => {
      if (status) status.textContent = "Copy the address at the top of your browser to share the garden.";
    });
  }

  function restoreShareAndFacebookOptions() {
    const section = document.querySelector(".share-panel");
    if (!section) return;

    const eyebrow = section.querySelector(".eyebrow");
    const heading = section.querySelector("h2");
    const description = section.querySelector("div > p:not(.eyebrow)");

    if (eyebrow) eyebrow.textContent = "SHARE THE JOY";
    if (heading) heading.textContent = "Share the garden and stay connected.";
    if (description) description.textContent = "Send ROSY MINDS GARDEN to a friend, or visit the official Rosy Minds Facebook Page for daily encouragement.";

    let shareButton = document.getElementById("shareButton");
    if (!shareButton) {
      shareButton = document.createElement("button");
      shareButton.id = "shareButton";
      shareButton.className = "secondary-button";
      shareButton.type = "button";
      shareButton.addEventListener("click", nativeShare);
    }
    shareButton.innerHTML = '<span aria-hidden="true">↗</span> Share Rosy Minds Garden';
    shareButton.setAttribute("aria-label", "Share Rosy Minds Garden with a friend");

    let actions = section.querySelector(".rosy-share-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "rosy-share-actions";
      actions.style.display = "grid";
      actions.style.gap = "10px";
      actions.style.minWidth = "min(310px, 100%)";
      section.appendChild(actions);
    }
    actions.appendChild(shareButton);

    let facebookLink = document.getElementById("rosyFacebookPageLink");
    if (!facebookLink) {
      facebookLink = document.createElement("a");
      facebookLink.id = "rosyFacebookPageLink";
      facebookLink.className = "secondary-button";
    }
    facebookLink.href = FACEBOOK_PAGE;
    facebookLink.target = "_blank";
    facebookLink.rel = "noopener noreferrer";
    facebookLink.setAttribute("aria-label", "Open the official Rosy Minds Facebook Page");
    facebookLink.style.display = "inline-flex";
    facebookLink.style.alignItems = "center";
    facebookLink.style.justifyContent = "center";
    facebookLink.style.textDecoration = "none";
    facebookLink.innerHTML = '<span aria-hidden="true">f</span>&nbsp; Visit Rosy Minds Facebook Page';
    actions.appendChild(facebookLink);

    let instructions = document.getElementById("shareInstructions");
    if (!instructions) {
      instructions = document.createElement("p");
      instructions.id = "shareInstructions";
      instructions.style.gridColumn = "1 / -1";
      instructions.style.margin = "0";
      instructions.style.padding = "13px 15px";
      instructions.style.borderRadius = "15px";
      instructions.style.background = "rgba(248,232,238,.68)";
      instructions.style.color = "#726772";
      instructions.style.fontSize = ".82rem";
      instructions.style.lineHeight = "1.55";
      instructions.innerHTML = '<strong style="color:#6f3652">How to share:</strong> Tap <strong>Share Rosy Minds Garden</strong>, then choose Facebook, Messages, Mail, or Copy.';
      section.appendChild(instructions);
    }

    const status = document.getElementById("shareStatus");
    if (status) section.appendChild(status);
  }

  const repaired = repairSavedProgress();
  if (repaired && !sessionStorage.getItem(REPAIR_FLAG)) {
    sessionStorage.setItem(REPAIR_FLAG, "1");
    window.location.reload();
    return;
  }

  const initializeUi = () => {
    restoreTopInstallButton();
    restoreShareAndFacebookOptions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeUi, { once: true });
  } else {
    initializeUi();
  }
})();
