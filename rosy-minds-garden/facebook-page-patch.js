(() => {
  const ROSY_MINDS_PAGE = "https://www.facebook.com/p/Rosy-Minds-100090055060602/";

  function leavePreviewMode() {
    const url = new URL(window.location.href);
    if (url.searchParams.get("preview") !== "30") return false;

    url.searchParams.delete("preview");
    const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
    window.location.replace(cleanUrl);
    return true;
  }

  if (leavePreviewMode()) return;

  function updateFacebookSection() {
    const section = document.querySelector(".panel.share");
    const button = document.getElementById("share");
    if (!section || !button) return;

    const heading = section.querySelector("h2");
    const description = section.querySelector("div > p:last-of-type");

    if (heading) heading.textContent = "Visit Rosy Minds on Facebook.";
    if (description) {
      description.textContent = "Open the official Rosy Minds Facebook Page for daily encouragement, prayers, and new garden updates.";
    }

    button.textContent = "↗ Open Rosy Minds Facebook Page";
    button.setAttribute("aria-label", "Open the official Rosy Minds Facebook Page");
    button.onclick = () => {
      window.open(ROSY_MINDS_PAGE, "_blank", "noopener,noreferrer");
    };

    const status = document.getElementById("status");
    if (status) status.textContent = "This button opens the official Rosy Minds Facebook Page.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateFacebookSection, { once: true });
  } else {
    updateFacebookSection();
  }
})();
