import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "../data/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(["active", "completed", "archived"]).default("active"),
    category: z.enum(["research", "personal"]).default("personal"),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "*.md", base: "../data/publications" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    date: z.coerce.date(),
    doi: z.string().optional(),
    tags: z.array(z.string()),
    abstract: z.string().optional(),
    pdf: z.string().optional(),
  }),
});

export const collections = { projects, publications };
