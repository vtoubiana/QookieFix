var api;
if (chrome == undefined) {
    api = browser;
} else {
    api = chrome;
}

function hasAlreadyAnswered() {
	return (document.cookie.indexOf('pubconsent=') > 0)
}



function addButton(mutations) {
  const qookiePopupShown = mutations.some(mutation => mutation.target.firstChild && mutation.target.firstChild.classList && mutation.target.firstChild.classList.contains("qc-cmp-ui-container"))
  if (qookiePopupShown) {
    const qookieDiv = document.getElementById("qcCmpButtons");
	if (qookieDiv) {
	  const qfixButton = document.getElementById("qcCmpButtonQookieFix");
	  const qfixOptOutButton = document.getElementsByClassName("qc-cmp-button qc-cmp-secondary-button"); //Test if the publisher already includes an opt-out
	  if (!qfixButton && !qfixOptOutButton.length) {
		const newButton = document.createElement("button");
		newButton.textContent = api.i18n.getMessage("refuseText");
		newButton.id = "qcCmpButtonQookieFix";
		newButton.name = "qc-cmp-button";
		newButton.className = "qc-cmp-button";
		newButton.setAttribute("onclick", 'window.__cmpui("setAndSaveAllConsent",!1)');
		qookieDiv.appendChild(newButton);

		if ( hasAlreadyAnswered() ) {
			newButton.click();
		} else {
      api.storage.sync.get((result) => {
        const autoDiscardEnabled = result.auto_discard_enabled || false;
        const autoDiscardDelay = (result.auto_discard_delay || 5) * 1000;
        if (autoDiscardEnabled) {
          new Promise((resolve) => setTimeout(resolve, autoDiscardDelay))
          .then(() => newButton.click());
        }
      });
    }
	  }
	}
  }
};

const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true });
