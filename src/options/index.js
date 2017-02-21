import OptSync from 'webext-options-sync';

new OptSync().syncForm(document.querySelector('#options-form'));

// chrome.storage.onChanged.addListener(changes => {
// 	const fields = {};
// 	for (const name of Object.keys(changes)) {
// 		fields[name] = changes[name].newValue;
// 	}
// 	updateInputs(fields);
// });
