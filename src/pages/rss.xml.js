import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// @see https://docs.astro.build/en/recipes/rss/
export async function GET(context) {
	const blog = await getCollection('blog');
	const projects = await getCollection('projects');
	const travels = await getCollection('travels');

	const items = blog
		.map((post) => ({
			title: post.data.title,
			pubDate: post.data.first_published,
			link: `/blog/${post.slug}/`,
		}))
		.concat(
			projects.map((post) => ({
				title: post.data.title,
				pubDate: post.data.first_published,
				link: `/projects/${post.slug}/`,
			})),
		)
		.concat(
			travels.map((post) => ({
				title: post.data.title,
				pubDate: post.data.first_published,
				link: `/projects/${post.slug}/`,
			})),
		);

	return rss({
		title: 'Veeck´s Homepage',
		description: 'Computerschlampe, Hoffotograf, Terrorpoet',
		site: context.site,
		items: items,
	});
}
