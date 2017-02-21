export default function (html) {
	if (!/<([\w:]+)/.test(html)) {
		return document.createTextNode(html);
	}

	const dummy = document.createElement('template');
	dummy.innerHTML = html.trim();
	if (dummy.content.firstChild === dummy.content.lastChild) {
		return dummy.content.firstChild;
	}
	return dummy.content; // <-- This is a DocumentFragment.
}
