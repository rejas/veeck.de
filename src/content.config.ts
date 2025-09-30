import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const preDefinedCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(), // TODO cleanup description / add leading
			first_published: z.coerce.date(),
			last_modified: z.coerce.date().optional(),
			tags: z.array(z.string()),
			img: image(),
			img_alt: z.string().optional(), // TODO alt text in frontmatter of pages
			lang: z.string(),
			lead: z.string().optional(),
		}),
});
export const collections = {
	galleries: defineCollection({
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				last_modified: z.coerce.date(),
				img: image(),
				img_alt: z.string().optional(), // TODO alt text in frontmatter of yamls
				lead: z.string().optional(),
				images: z.array(
					z.object({
						caption: z.string(),
						img: image(),
					}),
				),
			}),
		// Load YAML files in the src/content/galleries directory.
		loader: glob({ base: './src/content/galleries', pattern: '**/*.yaml' }),
	}),
	blog: {
		schema: () =>
			z.object({
				title: z.string(),
				first_published: z.coerce.date(),
				lang: z.string(),
				last_modified: z.coerce.date().optional(),
				tags: z.array(z.string()),
			}),
		// Load Markdown files in the src/content/projects directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
	},
	projects: {
		...preDefinedCollection,
		// Load Markdown files in the src/content/projects directory.
		loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
	},
	travels: {
		...preDefinedCollection,
		// Load Markdown files in the src/content/travels directory.
		loader: glob({ base: './src/content/travels', pattern: '**/*.mdx' }),
	},
};
