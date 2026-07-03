// 2026-07-03: JSON-LD Schema.org tipo School para rich results de Google.
// School es subtipo de EducationalOrganization, recomendado para colegios.

import {
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_PHONE,
  SITE_SOCIAL_LINKS,
  SITE_URL,
  absoluteUrl,
} from './site-config'

export interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'School'
  name: string
  url: string
  logo: string
  image: string
  description: string
  telephone: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  sameAs: readonly string[]
}

/** Genera el objeto JSON-LD de la institución educativa. */
export function getOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(SITE_LOGO_PATH),
    image: absoluteUrl(SITE_LOGO_PATH),
    description: SITE_DESCRIPTION,
    telephone: SITE_PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    sameAs: SITE_SOCIAL_LINKS,
  }
}
