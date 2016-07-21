window.OptMan = class OptMan {
	constructor(storageName = 'options') {
		this.storageName = storageName;
	}
	init(setup) {
		this.setup = Object.assign({
			defaults: {},
			migrations: [],
		}, setup);
		this._onInstall();
	}
	get(callback) {
		chrome.storage.sync.get(this.storageName,
			keys => callback(keys[this.storageName])
		);
	}
	set(newOptions, callback) {
		this.get(options => {
			Object.assign(options, newOptions);
			chrome.storage.sync.set({
				[this.storageName]: options,
			}, callback);
		});
	}
	_onInstall() {
		chrome.runtime.onInstalled.addListener(() => {
			this.get(options => {
				this.setup.migrations.forEach(migrate => migrate(options));
				const newOptions = Object.assign(this.setup.defaults, options);
				this.set(newOptions);
			});
		});
	}

	/**
	 * FORM CREATION PART
	 */
	createForm(...definitions) {
		this.form = OptMan._fromHTML(`<div>${definitions.join('')}</div>`);
		this.form.addEventListener('input', e => this._handleInputUpdates(e));
		this.form.addEventListener('change', e => this._handleInputUpdates(e));
		this.get(options => this._apply(options));
	}

	_apply(options) {
		Object.keys(options).forEach(name => {
			const els = this.form.querySelectorAll(`[name="${name}"]`);
			if (els.length) {
				console.info('Set option', name, 'to', options[name]);
				switch (els[0].type) {
					case 'checkbox':
						els[0].checked = options[name];
						break;
					case 'radio': {
						const selected = Array.from(els)
						.filter(el => el.value === options[name]);
						if (selected.length) {
							selected[0].checked = true;
						}
						break;
					}
					default:
						els[0].value = options[name];
						break;
				}
			} else {
				console.warn('Stored option', name, options[name], 'was not found on the page', options[name]);
			}
		});
	}
	_handleInputUpdates(e) {
		const el = e.target;
		const name = el.name;
		let value = el.value;
		switch (el.type) {
			case 'checkbox':
				value = el.checked;
				break;
			default: break;
		}
		console.info('Saving option', el.name, 'to', value);
		this.set({
			[name]: value,
		});
	}
	static _fromHTML(html) {
		const helper = document.createElement('div');
		helper.innerHTML = html;
		return helper.firstElementChild;
	}
	static title(text) {
		return `<h3>${text}</h3>`;
	}
	static radio(name, values, options = {}) {
		const html = [];
		if (options.oneLine) {
			html.push(`<div class="one-line-labels">`);
		}
		for (const value of Object.keys(values)) {
			html.push(`
				<label>
					<input name="${name}" type="radio" value="${value}">
					${values[value]}
				</label>
			`);
		}
		if (options.oneLine) {
			html.push(`</div>`);
		}
		return html.join('');
	}
	static checkbox(name, label) {
		return `
			<label>
				<input name="${name}" type="checkbox">
				${label}
			</label>
		`;
	}
};
