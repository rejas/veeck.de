import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
  projects: defineCollection({
    // Load Markdown files in the src/content/projects directory.
    loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
};
