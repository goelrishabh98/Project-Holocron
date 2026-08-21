// Prefix an internal path with the configured base. The site is served from
// the root of rishgoel.com, so BASE_URL is "/" — this keeps working if the site
// is ever moved back under a subpath.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
