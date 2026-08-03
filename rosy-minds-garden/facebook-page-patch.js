(() => {
  const CURRENT_KEY = "rosyMindsGardenV1";
  const NEWER_KEY = "rosyMindsGardenStateV1";
  const LEGACY_KEY = "rosyMindsGardenV3";
  const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=100090055060602";
  const REPAIR_FLAG = "rosyGardenRepairV2";

  function readState(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }

  function validDates(values) {
    return Array.isArray(values)
      ? values.filter((value) => typeof value === "string")
      : [];
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

  function restoreShareAndFacebookOptions() {
    const section = document.querySelector(".share-panel");
    const shareButton = document.getElementById("shareButton");
    if (!section || !shareButton) return;

    const eyebrow = section.querySelector(".eyebrow");
    const heading = section.querySelector("h2");
    const description = section.querySelector("div > p:not(.eyebrow)");

    if (eyebrow) eyebrow.textContent = "SHARE THE JOY";
    if (heading) heading.textContent = "Share the garden and stay connected.";
    if (description) {
      description.textContent = "Send ROSY MINDS GARDEN to a friend, or visit the official Rosy Minds Facebook Page for daily encouragement.";
    }

    shareButton.innerHTML = '<span aria-hidden="true">↗</span> Share Rosy Minds Garden';
    shareButton.setAttribute("aria-label", "Share Rosy Minds Garden with a friend");

    let actions = section.querySelector(".rosy-share-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "rosy-share-actions";
      actions.style.display = "grid";
      actions.style.gap = "10px";
      actions.style.alignItems = "start";
      shareButton.parentNode.insertBefore(actions, shareButton);
      actions.appendChild(shareButton);
    }

    if (!document.getElementById("rosyFacebookPageLink")) {
      const facebookLink = document.createElement("a");
      facebookLink.id = "rosyFacebookPageLink";
      facebookLink.className = "secondary-button";
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
    }

    let instructions = document.getElementById("shareInstructions");
    if (!instructions) {
      instructions = document.createElement("div");
      instructions.id = "shareInstructions";
      instructions.style.gridColumn = "1 / -1";
      instructions.style.marginTop = "2px";
      instructions.style.padding = "13px 15px";
      instructions.style.borderRadius = "15px";
      instructions.style.background = "rgba(248,232,238,.65)";
      instructions.style.color = "#726772";
      instructions.style.fontSize = ".82rem";
      instructions.style.lineHeight = "1.55";
      instructions.innerHTML = '<strong style="color:#6f3652">How to share:</strong> Tap <strong>Share Rosy Minds Garden</strong>, then choose Facebook, Messages, Mail, or Copy. On iPhone, followers can open the garden in Safari, tap the Share icon, and choose <strong>Add to Home Screen</strong>.';
      section.appendChild(instructions);
    }
  }

  const repaired = repairSavedProgress();
  if (repaired && !sessionStorage.getItem(REPAIR_FLAG)) {
    sessionStorage.setItem(REPAIR_FLAG, "1");
    window.location.reload();
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restoreShareAndFacebookOptions, { once: true });
  } else {
    restoreShareAndFacebookOptions();
  }
})();
