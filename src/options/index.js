import OptSync from 'webext-options-sync';

new OptSync().syncForm(document.querySelector('#options-form'));

// Localization
for (const el of document.querySelectorAll('[data-i18n]')) {
	el.innerHTML = chrome.i18n.getMessage(el.dataset.i18n);
}

