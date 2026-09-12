/** Format a date consistently across preview cards and detail pages, e.g. "27. November 2020". */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}
