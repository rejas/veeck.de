/** Sort collection entries by a Date field on `data`, newest first. Returns a new array. */
export function sortByDateDesc<T extends { data: Record<string, unknown> }>(
	entries: readonly T[],
	field: keyof T['data'] & string,
): T[] {
	return [...entries].sort((a, b) => (b.data[field] as Date).valueOf() - (a.data[field] as Date).valueOf());
}
