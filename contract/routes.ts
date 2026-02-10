function normalizeRouteTemplate(routeTemplate: string): string {
  // Manifest routes should be like `/analytics/posts/:postId` (no /v2/access prefix),
  // but accept other shapes defensively.
  if (!routeTemplate.startsWith('/')) return `/${routeTemplate}`;
  return routeTemplate;
}

export function fillRouteParams(routeTemplate: string, params: Record<string, string>): string {
  const tpl = normalizeRouteTemplate(routeTemplate);
  return tpl.replace(/:([A-Za-z0-9_]+)/g, (_m, name) => {
    const v = params[String(name)];
    if (v === undefined) return _m;
    return encodeURIComponent(String(v));
  });
}

