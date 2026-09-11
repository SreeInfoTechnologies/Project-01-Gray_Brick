import { warehouses } from '@/data/warehouses'
import { founderNode, organizationNode, websiteNode } from '@/lib/schema'

/**
 * One JSON-LD block. `<` is escaped so no string in the data can close the
 * script element early.
 */
export function JsonLd({ nodes }) {
  const graph = nodes.filter(Boolean)
  if (!graph.length) return null

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  )

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

/**
 * The graph every page shares: the organisation, the website and the founder.
 * Page-level nodes (the page itself, breadcrumbs, FAQs, facilities) come from
 * <Seo> and <Breadcrumbs>, and point back at these by `@id`.
 */
export function StructuredData() {
  return <JsonLd nodes={[organizationNode(warehouses), websiteNode(), founderNode()]} />
}
