import forecourtWide from '@/assets/images/gb-forecourt-wide.webp'
import frontageDusk from '@/assets/images/gb-frontage-dusk.webp'
import floorReady from '@/assets/images/gb-floor-ready.webp'
import floorReadyWide from '@/assets/images/gb-floor-ready-wide.webp'
import mezzanineStocked from '@/assets/images/gb-mezzanine-stocked.webp'
import mezzanineFmcg from '@/assets/images/gb-mezzanine-fmcg.webp'
import streetLoading from '@/assets/images/gb-street-loading.webp'
import streetBay from '@/assets/images/gb-street-bay.webp'

// ---------------------------------------------------------------------------
// REAL INVENTORY.
//
// Two facilities, both photographed. Every address, and every physical detail
// described below, is either supplied by Gray Brick or visible in the
// photographs attached to the record — the red-oxide floor finish, the steel
// truss roof, the storage mezzanine, the paved forecourt, the roller shutters.
//
// What is NOT here is anything measured. Built-up area, clear height, dock
// counts, floor loading and power provision resolve to ON_REQUEST, because no
// one has measured them for publication. Filling those in is a data change, not
// a code change.
//
// Areas Gray Brick sources across but does not itself hold are in
// `coverageAreas` below. They are deliberately separate from `locations`, which
// only ever contains places where a real facility stands.
//
// Replacing this file with a CMS or API response is the only change required:
// `useWarehouses()` in src/hooks/useWarehouses.js is the single consumer, and
// it already models loading, error and empty states.
// ---------------------------------------------------------------------------

export const ON_REQUEST = 'Available on request'

export const warehouseTypes = [
  { value: 'ready-to-move', label: 'Ready-to-Move' },
  { value: 'built-to-suit', label: 'Built-to-Suit' },
  { value: 'fulfillment', label: 'Fulfillment Center' },
  { value: 'distribution', label: 'Distribution Center' },
]

export const availabilityOptions = [
  { value: 'available', label: 'Available' },
  { value: 'limited', label: 'Limited availability' },
  { value: 'planned', label: 'In planning' },
]

/**
 * Places where Gray Brick holds a facility. One entry per real building, so a
 * location filter can never return an empty result for a place we listed.
 *
 * `address` is the full postal address and is what the directions link
 * resolves against. `street` and `postalCode` are the same address split into
 * the fields the structured data needs; keep all three in step. `corridor` is
 * the short form shown beside the name in listings.
 */
export const locations = [
  {
    value: 'hrbr-layout',
    label: 'HRBR Layout, Kalyan Nagar',
    corridor: '100 Feet Road · Bengaluru North-East',
    address:
      '100 Feet Rd, HRBR Layout 1st Block, Bapunagar, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043',
    street: '100 Feet Rd, HRBR Layout 1st Block, Bapunagar, HRBR Layout, Kalyan Nagar',
    postalCode: '560043',
  },
  {
    value: 'horamavu',
    label: 'Horamavu',
    corridor: 'Narayana Reddy Layout Road · Bengaluru East',
    address: 'Narayana Reddy Layout Rd, Horamavu, Bengaluru, Karnataka 560113',
    street: 'Narayana Reddy Layout Rd, Horamavu',
    postalCode: '560113',
  },
]

/**
 * Areas Gray Brick sources space across, as distinct from the facilities it
 * holds. Nothing here claims a building: these are the parts of Bengaluru the
 * team works in when a requirement does not fit either of the two facilities.
 */
export const coverageAreas = [
  { value: 'kalyan-nagar', label: 'Kalyan Nagar & Banaswadi', note: 'Bengaluru North-East, in-city' },
  { value: 'hennur', label: 'Horamavu & Hennur', note: 'Outer Ring Road, east' },
  { value: 'kr-puram', label: 'K R Puram & Whitefield', note: 'Old Madras Road corridor' },
  { value: 'hoskote', label: 'Hoskote', note: 'NH-75, east of the city' },
  { value: 'peenya', label: 'Peenya & Yeshwanthpur', note: 'Established industrial belt' },
  { value: 'nelamangala', label: 'Nelamangala & Dabaspet', note: 'NH-48, Tumakuru corridor' },
  { value: 'bommasandra', label: 'Bommasandra & Attibele', note: 'NH-44, Hosur corridor' },
  { value: 'doddaballapur', label: 'Doddaballapur', note: 'Airport corridor, north' },
]

/**
 * Options for the "where do you need space?" question on the enquiry form.
 *
 * This is a wider list than `locations` on purpose. `locations` filters our own
 * inventory, so it may only contain places we hold a building. The form is
 * capturing what the VISITOR wants, and someone who needs Peenya must be able
 * to say Peenya rather than being funnelled into one of our two facilities.
 *
 * Areas that duplicate a facility's own location are dropped, so the list never
 * offers the same place twice under two labels.
 */
export const enquiryAreas = [
  ...locations.map(({ value, label }) => ({ value, label })),
  ...coverageAreas
    .filter((area) => !locations.some((l) => l.value === area.value))
    .map(({ value, label }) => ({ value, label })),
]

/**
 * Space and requirement are captured from the visitor rather than claimed by
 * us. They qualify the enquiry and are carried through to the contact form,
 * so they intentionally do not filter the list.
 */
export const spaceBands = [
  { value: 'under-20k', label: 'Under 20,000 sq ft' },
  { value: '20k-50k', label: '20,000 to 50,000 sq ft' },
  { value: '50k-100k', label: '50,000 to 100,000 sq ft' },
  { value: 'above-100k', label: 'Above 100,000 sq ft' },
]

export const businessRequirements = [
  { value: 'storage', label: 'Storage' },
  { value: 'fulfillment', label: 'Fulfillment' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'manufacturing-support', label: 'Manufacturing support' },
  { value: 'undecided', label: 'Not decided yet' },
]

/**
 * Specification strip. `observed` rows are things the photographs show and the
 * team has confirmed; everything measurable stays ON_REQUEST until it has been
 * measured for publication.
 */
const specTemplate = (type, connectivity, observed = []) => [
  { label: 'Facility type', value: type },
  { label: 'Location', value: connectivity },
  ...observed,
  { label: 'Built-up area', value: ON_REQUEST },
  { label: 'Clear height', value: ON_REQUEST },
  { label: 'Power provision', value: ON_REQUEST },
]

export const warehouses = [
  {
    slug: 'hrbr-layout-100-feet-road',
    name: 'HRBR Layout Facility, 100 Feet Road',
    location: 'hrbr-layout',
    type: 'fulfillment',
    availability: 'limited',
    summary:
      'A working in-city facility on 100 Feet Road, running daily order volume out to riders.',
    overview: [
      'This one sits directly on 100 Feet Road in HRBR Layout 1st Block, which is about as close to Bengaluru\'s north-east demand as a warehouse gets. It is a working building, not an empty shell: it handles daily order volume for quick-commerce and FMCG operations, and rider vehicles load straight off the road frontage.',
      'Storage is on two levels. A steel mezzanine carries palletised and cartoned reserve stock, and the ground floor is kept as the active face, so picking happens without anyone climbing over bulk. Being in-city is the whole point here — the trip to the customer is short enough to run tight delivery windows.',
    ],
    features: [
      'Direct frontage onto 100 Feet Road',
      'Steel storage mezzanine over the ground floor',
      'Reserve stock above, active pick face below',
      'Loads straight onto rider and light goods vehicles',
      'Inside the demand zone it serves, not outside it',
      'Set up for quick commerce and FMCG distribution',
    ],
    observedSpecs: [
      { label: 'Storage arrangement', value: 'Ground floor plus steel mezzanine' },
      { label: 'Loading', value: 'Road-frontage loading bay' },
      { label: 'Current use', value: 'Quick commerce and FMCG distribution' },
    ],
    suitableFor: ['Fulfillment', 'Distribution'],
    image: streetLoading,
    // Link-preview card, generated by scripts/build-brand-assets.mjs. Optional:
    // a facility without one shares with the default card.
    ogImage: '/og/hrbr-layout-100-feet-road.jpg',
    imageAlt:
      'Road frontage of the HRBR Layout facility on 100 Feet Road, with rider vehicles at the loading bay and stock on pallets inside',
    gallery: [
      {
        src: streetLoading,
        alt: 'Loading bay open onto 100 Feet Road with rider vehicles alongside',
      },
      {
        src: mezzanineStocked,
        alt: 'Steel mezzanine carrying cartoned reserve stock above the picking floor',
      },
      {
        src: mezzanineFmcg,
        alt: 'Wide view of the storage floor and mezzanine under the steel truss roof',
      },
      {
        src: streetBay,
        alt: 'The loading bay itself: stock on pallets inside the opening, rider vehicles drawn up alongside',
      },
    ],
  },
  {
    slug: 'horamavu-narayana-reddy-layout',
    name: 'Horamavu Facility, Narayana Reddy Layout Road',
    location: 'horamavu',
    type: 'ready-to-move',
    availability: 'available',
    summary:
      'Newly completed space on Narayana Reddy Layout Road, handed over ready to rack.',
    overview: [
      'A recently finished building on Narayana Reddy Layout Road in Horamavu, on the eastern side of the city. It is handed over complete — the floor is laid and sealed in red-oxide finish, the steel truss roof is up, and high-bay lighting and ceiling fans are already installed. What is left to do is racking.',
      'The floor is a clear span with no columns interrupting it, which is what makes a racking layout worth planning properly rather than working around obstructions. Outside, a paved forecourt gives goods vehicles room to turn and stage without backing onto the road.',
    ],
    features: [
      'Clear-span floor, no internal columns',
      'Sealed red-oxide floor finish, laid and ready',
      'Steel truss roof with high-bay lighting installed',
      'Paved forecourt for vehicle turning and staging',
      'Loading at the covered front opening',
      'Available to occupy as it stands',
    ],
    observedSpecs: [
      { label: 'Floor', value: 'Clear span, sealed red-oxide finish' },
      { label: 'Roof', value: 'Steel truss with high-bay lighting' },
      { label: 'Loading', value: 'Covered front opening onto a paved forecourt' },
    ],
    suitableFor: ['Storage', 'Distribution', 'Fulfillment'],
    image: forecourtWide,
    ogImage: '/og/horamavu-narayana-reddy-layout.jpg',
    imageAlt:
      'Front elevation of the Horamavu facility, with its covered loading opening and paved forecourt',
    gallery: [
      {
        src: forecourtWide,
        alt: 'Gable front and paved forecourt of the Horamavu facility, stock on pallets inside the opening',
      },
      {
        src: floorReady,
        alt: 'Clear-span floor in sealed red-oxide finish under the steel truss roof',
      },
      {
        src: floorReadyWide,
        alt: 'Full width of the empty storage floor, ready for racking',
      },
      {
        src: frontageDusk,
        alt: 'Two-level frontage with roller shutters, photographed in the evening',
      },
    ],
  },
]

export const findWarehouse = (slug) => warehouses.find((w) => w.slug === slug)

export const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value

export const locationFor = (value) => locations.find((l) => l.value === value)

/**
 * Google's documented Maps URL API against the facility's own postal address.
 * No API key and no invented place ID: it resolves the way a search on
 * maps.google.com would.
 */
export const directionsFor = (warehouse) => {
  const address = locationFor(warehouse?.location)?.address
  return address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null
}

/** Facilities in the same area, or of the same type, excluding the current one. */
export const relatedWarehouses = (warehouse, list = warehouses, limit = 3) => {
  if (!warehouse) return []
  const scored = list
    .filter((w) => w.slug !== warehouse.slug)
    .map((w) => ({
      warehouse: w,
      score: (w.location === warehouse.location ? 2 : 0) + (w.type === warehouse.type ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((entry) => entry.warehouse)
}

export const buildSpecifications = (warehouse) =>
  specTemplate(
    labelFor(warehouseTypes, warehouse.type),
    locationFor(warehouse.location)?.corridor ?? ON_REQUEST,
    warehouse.observedSpecs ?? [],
  )
