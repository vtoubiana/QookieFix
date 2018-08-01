
function add_button(evt) {
		if ( evt.target !== undefined && evt.target.firstChild !== undefined && evt.target.firstChild.className === 'qc-cmp-ui-container') {
			var qookie_div = $('#qcCmpButtons');
			if ( qookie_div.length === 1) {
				var qfix_button = $('#qcCmpButtonQookieFix');
				if ( qfix_button.length === 0) {
					var $new_button = $('<button/>').attr({ id:"qcCmpButtonQookieFix", name:'qc-cmp-button', class:'qc-cmp-button', onclick:'window.__cmpui("setAndSaveAllConsent",!1)'}).text("Je refuse");
					qookie_div.append($new_button);
				}
			} 
		}
}


document.body.addEventListener('DOMSubtreeModified',add_button);
