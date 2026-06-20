import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { type SchemaContext, defineCollection } from 'astro:content';

const preDefinedSchema = ({ image }: SchemaContext) =>
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
	blog: defineCollection({
		schema: () =>
			z.object({
				title: z.string(),
				description: z.string().optional(),
				first_published: z.coerce.date(),
				lang: z.string(),
				last_modified: z.coerce.date().optional(),
				tags: z.array(z.string()),
			}),
		// Load Markdown files in the src/content/blog directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
	}),
	projects: defineCollection({
		schema: preDefinedSchema,
		// Load Markdown files in the src/content/projects directory.
		loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
	}),
	travels: defineCollection({
		schema: preDefinedSchema,
		// Load Markdown files in the src/content/travels directory.
		loader: glob({ base: './src/content/travels', pattern: '**/*.mdx' }),
	}),
};
