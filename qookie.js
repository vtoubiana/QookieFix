var api;
if (chrome == undefined) {
    api = browser;
} else {
    api = chrome;
}





function addButton(mutations) {
  const qookiePopupShown = mutations.some(mutation => mutation.target.firstChild && mutation.target.firstChild.classList && mutation.target.firstChild.classList.contains("qc-cmp-ui-container"))
  if (qookiePopupShown) {
	const qookieDiv = document.getElementById("qcCmpButtons");
	if (qookieDiv) {
		const qfixOptOutButton = document.getElementsByClassName("qc-cmp-button qc-cmp-secondary-button"); //Test if the publisher already includes an opt-out 
		const qfixButton = document.getElementById("qcCmpButtonQookieFix");
		if (!qfixButton && (!qfixOptOutButton.length ||  (qfixOptOutButton[0].onclick.toString() !== optoutFunction) )) {
			const newButton = document.createElement("button");
			newButton.textContent = "Refuse";
			newButton.id = "qcCmpButtonQookieFix";
			newButton.name = "qc-cmp-button";
			newButton.className = "qc-cmp-button";
			document.getElementById("qcCmpButtons").appendChild(newButton);
			var s = document.createElement('script');
			// TODO: add "script.js" to web_accessible_resources in manifest.json
			s.src = api.extension.getURL('script.js');
			s.onload = function() {
				this.remove();
			};
			document.documentElement.appendChild(s); 
		}
	  }
	}
};

const optoutFunction = 'function(){window.__cmpui("setAndSaveAllConsent",!1)}';
const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true });
