// Prefix an internal path with the configured base (e.g. "/Project-Holocron"),
// so links work both in local dev and under a GitHub Pages subpath.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
