import * as fs from 'fs';
import { createElement as h } from 'react';

// Custom Open Graph card for shared links.
//
// Rendered by `astro-opengraph-images` (via Satori) at build time. Uses the
// site's own dark header background with a large, centred title overlaid, so
// shared links look like the real site (and stay legible when chat apps shrink
// the card to a thumbnail).
//
// The header image is inlined as a data URI because Satori has no network
// access at build time. Satori notes: every element with more than one child
// needs an explicit `display: flex`, and only the font families/weights
// registered in `astro.config.mjs` are available.
const headerImage = fs.readFileSync('public/assets/backgrounds/bg-main-dark-1440w.jpg');
const headerImageUri = `url(data:image/jpeg;base64,${headerImage.toString('base64')})`;

/**
 * @param {import('astro-opengraph-images').RenderFunctionInput} input
 * @returns {import('react').ReactNode}
 */
export function ogCard({ title, description }) {
	return h(
		'div',
		{
			style: {
				display: 'flex',
				height: '100%',
				width: '100%',
				backgroundImage: headerImageUri,
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
					// Subtle darkening for legibility over the header image.
					backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.7))',
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
						textShadow: '0 2px 12px rgba(0,0,0,0.55)',
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
								textShadow: '0 2px 10px rgba(0,0,0,0.5)',
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
					},
				},
				'veeck.de',
			),
		),
	);
}
