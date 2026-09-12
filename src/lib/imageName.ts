/**
 * Derive a stable, reorder-proof identifier from a source filename, for shareable
 * `#<filename>` lightbox deep links. The emitted asset carries a content hash in
 * production (name.hash.ext) but not in dev, so strip the extension and an
 * optional trailing 8-char hash.
 */
export function imageName(src: string): string {
	const base = (src.split('/').pop() ?? '').split('?')[0];
	const noExt = base.replace(/\.[a-z0-9]+$/i, '');
	return noExt.replace(/\.[\w-]{8}$/, '');
}
