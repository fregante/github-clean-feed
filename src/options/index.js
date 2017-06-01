import OptSync from 'webext-options-sync';

new OptSync().syncForm(document.querySelector('#options-form'));

// chrome.storage.onChanged.addListener(changes => {
// 	const fields = {};
// 	for (const name of Object.keys(changes)) {
// 		fields[name] = changes[name].newValue;
// 	}
// 	updateInputs(fields);
// });

// Localization
for (const el of document.querySelectorAll('[data-i18n]')) {
	el.innerHTML = chrome.i18n.getMessage(el.dataset.i18n);
}
