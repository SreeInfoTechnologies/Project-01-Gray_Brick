import { company } from '@/data/company'
import { webPageNode } from '@/lib/schema'
import { SITE_NAME, assetUrl, pageUrl } from '@/lib/site'
import { JsonLd } from './StructuredData'

// Share cards are generated at 1200 × 630 by scripts/build-brand-assets.mjs,
// the size every major platform renders as a large preview.
const DEFAULT_IMAGE = '/og/default.jpg'
const DEFAULT_IMAGE_ALT = `${company.name}: warehouse space in Bengaluru`
const IMAGE_WIDTH = '1200'
const IMAGE_HEIGHT = '630'

const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX = 'noindex, follow'

/**
 * Per-page document metadata. React 19 hoists these tags into <head>, and the
 * build prerenders every route, so they are in the HTML a crawler receives
 * before any JavaScript runs.
 *
 * `pageType` is the schema.org type of the page (AboutPage, ContactPage,
 * CollectionPage…) and `mainEntity` what the page is primarily about.
 * `schema` takes any further nodes, such as a facility or a list of FAQs;
 * they are published in the same graph.
 */
export function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  type = 'website',
  exact = false,
  noindex = false,
  pageType = 'WebPage',
  mainEntity,
  schema = [],
}) {
  // `exact` is for titles that already carry the brand, e.g. the homepage.
  const fullTitle = exact ? title : title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${company.shortStatement}`
  const canonical = pageUrl(path)
  const imageUrl = assetUrl(image)

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? NOINDEX : INDEX} />
      {noindex ? null : <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={IMAGE_WIDTH} />
      <meta property="og:image:height" content={IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {noindex ? null : (
        <JsonLd
          nodes={[
            webPageNode({ path, name: fullTitle, description, type: pageType, image, imageAlt, mainEntity }),
            ...schema,
          ]}
        />
      )}
    </>
  )
}
