{
	const arr = Array.prototype;
	this.ArraySet = function (iterable) {
		return new Proxy(new Set(iterable), {
			has(target, property) {
				return target.has(property);
			},
			set(target, property, value) {
				return target.set(property, value);
			},
			get(target, property) {
				if (property in arr && arr[property] && arr[property].bind) {
					return arr[property].bind(target);
				}
				switch (property) {
					case 'size':
						return target[property];
					case 'add':
						return target[property].bind(target);
					default:
						return target.get(property);
				}
			},
		});
	};

	this.ObjectMap = function (iterable) {
		return new Proxy(new Map(iterable), {
			has(target, property) {
				return target.has(property);
			},
			set(target, property, value) {
				return target.set(property, value);
			},
			get(target, property) {
				switch (property) {
					case 'size':
						return target[property];
					case 'forEach':
						return target[property].bind(target);
					default:
						return target.get(property);
				}
			},
		});
	};
}
