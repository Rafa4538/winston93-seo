// 2026-07-03: sitemap.xml dinámico vía MetadataRoute.
// Genera automáticamente todas las rutas estáticas definidas en routes.ts.
// Para añadir páginas futuras, solo actualizar SITE_ROUTES.

import type { MetadataRoute } from 'next'
import { SITE_ROUTES } from '@/lib/seo/routes'
import { absoluteUrl } from '@/lib/seo/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return SITE_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
