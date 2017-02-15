export const $ = selector => document.querySelector(selector);
export const $$ = (selector, has) => {
	const elements = Array.from(document.querySelectorAll(selector));
	if (has) {
		return elements.filter(el => el.querySelector(has));
	}
	return elements;
};
