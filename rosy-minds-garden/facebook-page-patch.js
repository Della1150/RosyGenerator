(() => {
  const ROSY_MINDS_PAGE = "https://www.facebook.com/p/Rosy-Minds-100090055060602/";

  function cleanPreviewParameter() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("preview")) return;
    url.searchParams.delete("preview");
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function connectFacebookButton() {
    const currentButton = document.getElementById("shareButton");
    if (!currentButton) return;

    const replacement = currentButton.cloneNode(true);
    replacement.textContent = "↗ Open Rosy Minds Facebook Page";
    replacement.setAttribute("aria-label", "Open the official Rosy Minds Facebook Page");
    replacement.addEventListener("click", () => {
      const status = document.getElementById("shareStatus");
      if (status) status.textContent = "Opening the official Rosy Minds Facebook Page…";
      window.location.assign(ROSY_MINDS_PAGE);
    });
    currentButton.replaceWith(replacement);
  }

  cleanPreviewParameter();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectFacebookButton, { once: true });
  } else {
    connectFacebookButton();
  }
})();
