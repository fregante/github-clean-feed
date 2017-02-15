/**
 * Get unique values in an array as keys of an object
 * @param  {Array|Array-like} arrayLike   The values to map, e.g. ['a', 'b', 'c', 1]
 * @return {object}                       The values map, e.g. {a:true, b:true, c:true, '1':true}
 */
export default function (arrayLike) {
	return Array.from(arrayLike).reduce((list, cls) => {
		list[cls] = true;
		return list;
	}, {});
}
