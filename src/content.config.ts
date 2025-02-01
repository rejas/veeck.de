import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const preDefinedCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			publish_date: z.coerce.date(),
			tags: z.array(z.string()),
			img: image(),
			img_alt: z.string().optional(),
			lang: z.string(),
			last_modified: z.coerce.date().optional(),
		}),
});
export const collections = {
	projects: {
		...preDefinedCollection,
		// Load Markdown files in the src/content/projects directory.
		loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
	},
	// copy projects into a travels object and replace the loader property
	travels: {
		...preDefinedCollection,
		// Load Markdown files in the src/content/travels directory.
		loader: glob({ base: './src/content/travels', pattern: '**/*.mdx' }),
	},
};
