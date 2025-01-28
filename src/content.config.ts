import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const preDefinedCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
    lang: z.string(),
  }),
});
export const collections = {
  projects: {
    ...preDefinedCollection,
    // Load Markdown files in the src/content/projects directory.
    loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  },
  // copy projects into a travel object and replace the loader property
  travels: {
    ...preDefinedCollection,
    // Load Markdown files in the src/content/travel directory.
    loader: glob({ base: './src/content/travels', pattern: '**/*.mdx' }),
  },
};
