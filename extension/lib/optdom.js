class OptDom {
	static _parseClasses(classes = '') {
		if (typeof classes === 'string') {
			return classes;
		}
		return Array.from(classes).join(' ');
	}

	static join(...definitions) {
		const helper = document.createElement('div');
		helper.innerHTML = `<div class="OptDom">${definitions.join('')}</div>`;
		return helper.firstElementChild;
	}

	static title(text, {className} = {}) {
		return `<h3 class="OptDom-h3 ${OptDom._parseClasses(className)}">${text}</h3>`;
	}

	static radio(name, values, {className} = {}) {
		const html = [];
		html.push(`<div class="OptDom-radio ${OptDom._parseClasses(className)}">`);
		for (let value of Object.keys(values)) {
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

	static checkbox(name, label, {className} = {}) {
		return `
			<div class="OptDom-checkbox ${OptDom._parseClasses(className)}">
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
