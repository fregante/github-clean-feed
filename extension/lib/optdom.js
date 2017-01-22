class OptDom {
	static join(...definitions) {
		const helper = document.createElement('div');
		helper.innerHTML = `<div class="OptDom">${definitions.join('')}</div>`;
		return helper.firstElementChild;
	}

	static title(text) {
		return `<h3 class="OptDom-h3">${text}</h3>`;
	}

	static radio(name, values) {
		const html = [];
		html.push(`<div class="OptDom-radio">`);
		for (const value of Object.keys(values)) {
			html.push(`
				<label>
					<input name="${name}" type="radio" value="${value}">
					${values[value]}
				</label>
			`);
		}
		html.push(`</div>`);
		return html.join('');
	}

	static checkbox(name, label) {
		return `
			<div class="OptDom-checkbox">
				<label>
					<input name="${name}" type="checkbox">
					${label}
				</label>
			</div>
		`;
	}
}

if (typeof exports === 'object') {
	exports.OptDom = OptDom;
}
