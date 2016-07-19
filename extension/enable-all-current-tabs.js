// include this as a background script
// it will automatically load content_scripts on all current tabs
// But no stylesheeds yet
(function enableAllCurrentTabs() {
	chrome.runtime.getManifest().content_scripts.forEach(script => {
		const loadContentScripts = tab => {
			script.js.forEach(file => {
				chrome.tabs.executeScript(tab.id, {
					allFrames: script.all_frames,
					file
				}, () => {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError);
					}
				});
			});
		};
		chrome.tabs.query({
			url: script.matches
		}, tabs => {
			tabs.forEach(loadContentScripts);
		});
	});
})();
