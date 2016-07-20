function handleInputUpdates(e) {
	const el = e.target;
	const name = el.name;
	let value = el.value;
	switch (el.type) {
		case 'checkbox':
			value = el.checked;
			break;
		default: break;
	}
	// console.info('Saving option', el.name, 'to', value);
	chrome.storage.sync.set({
		[name]: value,
	});
}
document.body.addEventListener('input', handleInputUpdates);
document.body.addEventListener('change', handleInputUpdates);
function updateInputs(items) {
	Object.keys(items).forEach(name => {
		const els = document.querySelectorAll(`[name="${name}"]`);
		if (els.length) {
			console.info('Set option', name, 'to', items[name]);
			switch (els[0].type) {
				case 'checkbox':
					els[0].checked = items[name];
					break;
				case 'radio': {
					const selected = Array.from(els)
					.filter(el => el.value === items[name]);
					if (selected.length) {
						selected[0].checked = true;
					}
					break;
				}
				default:
					els[0].value = items[name];
					break;
			}
		} else {
			console.warn('Stored option', name, items[name], 'was not found on the page', items[name]);
		}
	});
}
chrome.storage.sync.get(updateInputs);
chrome.storage.onChanged.addListener(changes => {
	const fields = {};
	for (const name of Object.keys(changes)) {
		fields[name] = changes[name].newValue;
	}
	updateInputs(fields);
});
