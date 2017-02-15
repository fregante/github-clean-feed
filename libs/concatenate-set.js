export default function (set, ...iterables) {
	for (const iterable of iterables) {
		for (const item of iterable) {
			set.add(item);
		}
	}
}
