import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Drafts are visible while running `astro dev` so you can preview unpublished
 * work, and are stripped from every production build. Nothing marked
 * `draft: true` is ever written to `dist/` — no card, no detail page, no entry
 * in the resume PDF.
 */
export const showDrafts = !import.meta.env.PROD;

/**
 * The single source of truth for "which projects may be shown".
 * Always go through this instead of calling getCollection("projects") directly,
 * so a new page can't accidentally leak a draft.
 */
export async function getVisibleProjects(): Promise<
  CollectionEntry<"projects">[]
> {
  const all = await getCollection("projects");
  return all.filter((p) => showDrafts || !p.data.draft);
}

/** Visible projects in one category, newest first. */
export async function getProjectsByCategory(
  category: "research" | "personal",
): Promise<CollectionEntry<"projects">[]> {
  const visible = await getVisibleProjects();
  return visible
    .filter((p) => p.data.category === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
