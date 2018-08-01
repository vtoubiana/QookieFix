function addButton(mutations) {
  const qookiePopupShown = mutations.some(mutation => mutation.target.firstChild && mutation.target.firstChild.classList && mutation.target.firstChild.classList.contains("qc-cmp-ui-container"))
  if (qookiePopupShown) {
    const qookieDiv = document.getElementById("qcCmpButtons");
    if (qookieDiv) {
      const qfixButton = document.getElementById("qcCmpButtonQookieFix");
      if (!qfixButton) {
        const newButton = document.createElement("button");
        newButton.textContent = "Je refuse";
        newButton.id = "qcCmpButtonQookieFix";
        newButton.name = "qc-cmp-button";
        newButton.className = "qc-cmp-button";
        newButton.setAttribute("onclick", 'window.__cmpui("setAndSaveAllConsent",!1)');
        qookieDiv.appendChild(newButton);
      }
    }
  }
};

const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true });
