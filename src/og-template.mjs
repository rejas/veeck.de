import { createElement as h } from 'react';

// Custom Open Graph card for shared links.
//
// Rendered by `astro-opengraph-images` (via Satori) at build time. Uses the
// site's purple brand gradient with a large, centred title so the card stays
// legible when chat apps shrink it to a thumbnail — the previous black-and-white
// preset pinned small text to one corner, which read as a plain black box.
//
// Satori notes: every element with more than one child needs an explicit
// `display: flex`, and only the font families/weights registered in
// `astro.config.mjs` are available.
export function ogCard({ title, description }) {
	return h(
		'div',
		{
			style: {
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				padding: '80px 90px',
				// Matches --gradient-accent in src/styles/global.css.
				backgroundImage: 'linear-gradient(150deg, #c561f6, #7611a6, #1c0056)',
				color: '#fff',
				fontFamily: 'Josefin Sans',
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
							opacity: 0.92,
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
					opacity: 0.85,
				},
			},
			'veeck.de',
		),
	);
}
