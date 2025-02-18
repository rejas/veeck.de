import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// @see https://docs.astro.build/en/recipes/rss/
export async function GET(context) {
	const blog = await getCollection('blog');
	const projects = await getCollection('projects');
	const travels = await getCollection('travels');

	const createItem = (post, type) => ({
		title: post.data.title,
		pubDate: post.data.first_published,
		link: `${type}/${post.slug}`,
	});

	const items = [
		...blog.map((post) => createItem(post, 'blog')),
		...projects.map((post) => createItem(post, 'projects')),
		...travels.map((post) => createItem(post, 'travels')),
	];

	return rss({
		title: 'Veeck´s Homepage',
		description: 'Computerschlampe, Hoffotograf, Terrorpoet',
		site: context.site,
		items: items,
	});
}
