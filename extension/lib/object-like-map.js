{
	this.ObjectMap = function (iterable) {
		return new Proxy(new Map(iterable), {
			has(target, property) {
				return target.has(property);
			},
			set(target, property, value) {
				return target.set(property, value);
			},
			get(target, property) {
				switch(property) {
				case 'size':
					return target[property];
				case 'forEach':
					return target[property].bind(target);
				default:
					return target.get(property);
				}
			}
		});
	};
}
