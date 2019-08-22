
function _QookieFixhasAlreadyAnswered() {
	if ( (document.cookie.indexOf('pubconsent') > 0) || (document.cookie.indexOf('euconsent=') > 0)) {
		return true;
	}
	return false;
}






document.getElementById('qcCmpButtonQookieFix').setAttribute("onclick", 'window.__cmpui("setAndSaveAllConsent",!1)');

if ( _QookieFixhasAlreadyAnswered() ) {
	document.getElementById('qcCmpButtonQookieFix').click();
} 
