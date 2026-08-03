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

    // Every completed day must unlock one blessing and place one flower in the garden.
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

  function installDirectFacebookLink() {
    const button = document.getElementById("shareButton");
    if (!button) return;

    const link = document.createElement("a");
    link.className = button.className;
    link.href = FACEBOOK_PAGE;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Open the official Rosy Minds Facebook Page");
    link.style.display = "inline-flex";
    link.style.alignItems = "center";
    link.style.justifyContent = "center";
    link.style.textDecoration = "none";
    link.innerHTML = '<span aria-hidden="true">↗</span>&nbsp; Open Rosy Minds Facebook Page';
    button.replaceWith(link);
  }

  const repaired = repairSavedProgress();
  if (repaired && !sessionStorage.getItem(REPAIR_FLAG)) {
    sessionStorage.setItem(REPAIR_FLAG, "1");
    window.location.reload();
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installDirectFacebookLink, { once: true });
  } else {
    installDirectFacebookLink();
  }
})();
