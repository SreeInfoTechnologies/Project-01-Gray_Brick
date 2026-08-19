import { company } from '@/data/company'

const SITE_NAME = 'Gray Brick Infra'
const SITE_URL = import.meta.env.VITE_SITE_URL ?? ''

const origin = () => SITE_URL || (typeof window === 'undefined' ? '' : window.location.origin)

/**
 * Per-page document metadata. React 19 hoists these tags into <head>, so no
 * helmet dependency is needed.
 */
export function Seo({ title, description, path = '/', image, type = 'website', exact = false }) {
  // `exact` is for pages that want the brand first, e.g. the homepage.
  const fullTitle = exact ? title : title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${company.shortStatement}`
  const canonical = `${origin()}${path}`
  const imageUrl = image ? `${origin()}${image}` : null

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}

      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
