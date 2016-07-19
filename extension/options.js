const inputs = Array.from(document.querySelectorAll('input'));
inputs.forEach(el => {
	const handleUpdate = e => {
		const id = el.id;
		chrome.storage.sync.set({
			[id]: el.checked
		});
	};
	el.addEventListener('input', handleUpdate);
	el.addEventListener('change', handleUpdate);
});
function updateInputs() {
	chrome.storage.sync.get(items => {
		Object.keys(items).forEach(id => {
			document.getElementById(id).checked = items[id];
		});
	});
}
updateInputs();
// chrome.storage.onChanged.addListener(updateInputs); //todo
