import * as fs from 'fs';
import * as path from 'path';
import { createElement as h } from 'react';

// Custom Open Graph card for shared links.
//
// Rendered by `astro-opengraph-images` (via Satori) at build time. Each card
// uses the shared page's *own* header image (the `img` from its frontmatter) as
// the background, with a large centred title overlaid — so a shared travel diary
// shows that diary's photo, a gallery shows its cover, etc. Pages without a
// header image (blog posts, static pages, the homepage) fall back to the site's
// dark header background.
//
// Images are inlined as data URIs because Satori has no filesystem/network
// access at render time. Satori notes: every element with more than one child
// needs an explicit `display: flex`, and only the font families/weights
// registered in `astro.config.mjs` are available.

const siteFallback = toDataUri('public/assets/backgrounds/bg-main-dark-1440w.jpg');

/** Build a `url(data:...)` value for a local image file, or null if unreadable. */
function toDataUri(filePath) {
	try {
		const mime = path.extname(filePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
		return `url(data:${mime};base64,${fs.readFileSync(filePath).toString('base64')})`;
	} catch {
		return null;
	}
}

/**
 * Resolve a page's own header image from its URL by reading the `img` field of
 * the backing content entry. Returns a `url(data:...)` value or null.
 * @param {string} pageUrl
 */
function headerImageFor(pageUrl) {
	const segments = new URL(pageUrl).pathname.split('/').filter(Boolean);
	const [section, slug] = segments;
	if (!slug) return null;

	// Map the public route to the content entry that defines its `img`.
	let contentDir, entryFile;
	if (section === 'travels' || section === 'projects') {
		contentDir = path.join('src/content', section, slug);
		entryFile = path.join(contentDir, 'index.mdx');
	} else if (section === 'photos') {
		contentDir = path.join('src/content/galleries', slug);
		entryFile = path.join(contentDir, 'index.yaml');
	} else {
		return null;
	}

	let frontmatter;
	try {
		frontmatter = fs.readFileSync(entryFile, 'utf8');
	} catch {
		return null;
	}
	// Grab the `img:` value (e.g. `./th_01.jpg` or `'./big.jpg'`).
	const match = frontmatter.match(/^img:\s*['"]?([^'"\n]+?)['"]?\s*$/m);
	if (!match) return null;

	return toDataUri(path.join(contentDir, match[1]));
}

/**
 * @param {import('astro-opengraph-images').RenderFunctionInput} input
 * @returns {import('react').ReactNode}
 */
export function ogCard({ title, description, url }) {
	const background = headerImageFor(url) ?? siteFallback;

	return h(
		'div',
		{
			style: {
				display: 'flex',
				height: '100%',
				width: '100%',
				backgroundImage: background,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			},
		},
		h(
			'div',
			{
				style: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					height: '100%',
					width: '100%',
					padding: '80px 90px',
					color: '#fff',
					fontFamily: 'Josefin Sans',
					// Darken the photo so the overlaid text stays legible.
					backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.78))',
				},
			},
			h(
				'div',
				{
					style: {
						display: 'flex',
						fontSize: 84,
						fontWeight: 700,
						lineHeight: 1.1,
						textShadow: '0 2px 12px rgba(0,0,0,0.6)',
					},
				},
				title,
			),
			description
				? h(
						'div',
						{
							style: {
								display: 'flex',
								marginTop: 24,
								fontSize: 42,
								fontWeight: 400,
								opacity: 0.95,
								textShadow: '0 2px 10px rgba(0,0,0,0.55)',
							},
						},
						description,
					)
				: null,
			h(
				'div',
				{
					style: {
						display: 'flex',
						marginTop: 'auto',
						paddingTop: 48,
						fontSize: 32,
						fontWeight: 600,
						opacity: 0.9,
						textShadow: '0 2px 10px rgba(0,0,0,0.55)',
					},
				},
				'veeck.de',
			),
		),
	);
}
