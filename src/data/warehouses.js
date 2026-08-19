import interiorOpen from '@/assets/images/facility-interior-open.webp'
import interiorBright from '@/assets/images/facility-interior-bright.webp'
import interiorColumns from '@/assets/images/facility-interior-columns.webp'
import exteriorDusk from '@/assets/images/facility-exterior-dusk.webp'
import industrialFacade from '@/assets/images/industrial-facade.webp'
import facadeRoof from '@/assets/images/facade-roofline.webp'
import hallTrusses from '@/assets/images/hall-steel-trusses.webp'
import truckAtFacility from '@/assets/images/truck-at-facility.webp'
import truckHighway from '@/assets/images/truck-highway.webp'
import containerTruck from '@/assets/images/container-truck-dusk.webp'
import containerYard from '@/assets/images/container-yard.webp'
import railFreight from '@/assets/images/rail-container-freight.webp'
import railWagons from '@/assets/images/rail-wagons.webp'
import rackingAisle from '@/assets/images/racking-aisle.webp'
import rackingInventory from '@/assets/images/racking-inventory.webp'
import rackingSteel from '@/assets/images/racking-steel-empty.webp'
import cratesStacked from '@/assets/images/crates-stacked.webp'
import palletsStacked from '@/assets/images/pallets-stacked.webp'

// ---------------------------------------------------------------------------
// PLACEHOLDER INVENTORY.
//
// These records describe the *kind* of facility Gray Brick works with across
// the Bengaluru industrial corridors. They carry no measured areas, clear
// heights, dock counts or dates, because none have been supplied. Every
// measurable field resolves to ON_REQUEST and the UI labels it as such.
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

export const locations = [
  { value: 'nelamangala', label: 'Nelamangala', corridor: 'NH-48 · Tumkur Road' },
  { value: 'hoskote', label: 'Hoskote', corridor: 'NH-75 · Old Madras Road' },
  { value: 'bommasandra', label: 'Bommasandra', corridor: 'NH-44 · Hosur Road' },
  { value: 'whitefield', label: 'Soukya Road, Whitefield', corridor: 'Budigere Cross corridor' },
  { value: 'dabaspet', label: 'Dabaspet', corridor: 'NH-48 · Bengaluru to Tumakuru' },
  { value: 'attibele', label: 'Attibele', corridor: 'NH-44 · Bengaluru to Hosur' },
  { value: 'doddaballapur', label: 'Doddaballapur', corridor: 'Bengaluru North · airport corridor' },
  { value: 'peenya', label: 'Peenya', corridor: 'Peenya Industrial Area' },
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

const specTemplate = (type, connectivity) => [
  { label: 'Facility type', value: type },
  { label: 'Road connectivity', value: connectivity },
  { label: 'Built-up area', value: ON_REQUEST },
  { label: 'Clear height', value: ON_REQUEST },
  { label: 'Loading infrastructure', value: ON_REQUEST },
  { label: 'Flooring', value: ON_REQUEST },
  { label: 'Power provision', value: ON_REQUEST },
  { label: 'Parking and circulation', value: ON_REQUEST },
]

export const warehouses = [
  {
    slug: 'nelamangala-logistics-park',
    name: 'Nelamangala Logistics Park',
    location: 'nelamangala',
    type: 'ready-to-move',
    availability: 'available',
    summary:
      'Completed space on the Tumkur Road corridor, ready to take over as it is.',
    overview: [
      'This is a finished building on the Nelamangala stretch of NH-48, one of the corridors most Bengaluru businesses use to move goods in and out from the north-west. It is handed over in a state where you can start racking rather than waiting on construction.',
      'The floor is kept clear of unnecessary obstruction, and loading runs along one elevation, so inbound and outbound can be separated as volumes grow.',
    ],
    features: [
      'Clear floor, ready for racking',
      'Loading along a single elevation',
      'Vehicle movement kept off the storage floor',
      'Straight onto the NH-48 corridor',
      'Space to stage inbound and outbound',
      'Works for storage or distribution use',
    ],
    suitableFor: ['Storage', 'Distribution'],
    image: interiorOpen,
    imageAlt: 'Open interior floor of the Nelamangala warehouse ready for occupation',
    gallery: [
      { src: interiorOpen, alt: 'Clear storage floor with column-free spans' },
      { src: exteriorDusk, alt: 'Warehouse units across the estate at dusk' },
      { src: truckAtFacility, alt: 'Goods carrier positioned at the loading door' },
      { src: hallTrusses, alt: 'Steel truss roof structure over the storage floor' },
    ],
  },
  {
    slug: 'hoskote-distribution-facility',
    name: 'Hoskote Distribution Facility',
    location: 'hoskote',
    type: 'distribution',
    availability: 'available',
    summary:
      'Dock-forward facility on Old Madras Road, built around daily vehicle movement.',
    overview: [
      'On the Hoskote stretch of NH-75, this one is arranged for movement rather than long-hold storage. Docks run along the main elevation with staging depth behind them, so consignments can be built and sent out without blocking the floor.',
      'The yard is planned for freight vehicles, which is what keeps turnaround predictable when inbound and outbound land in the same window.',
    ],
    features: [
      'Dock-forward layout for continuous flow',
      'Staging depth behind the dock line',
      'Yard sized for freight vehicle movement',
      'Inbound and outbound kept apart',
      'Direct access to the NH-75 corridor',
      'Suits distribution and cross-dock work',
    ],
    suitableFor: ['Distribution', 'Storage'],
    image: truckAtFacility,
    imageAlt: 'Goods carrier at the loading door of the Hoskote distribution facility',
    gallery: [
      { src: truckAtFacility, alt: 'Goods carrier loading at the facility' },
      { src: truckHighway, alt: 'Covered freight vehicle on the highway corridor' },
      { src: containerYard, alt: 'Containers staged in the yard' },
      { src: containerTruck, alt: 'Container-bodied vehicle waiting at the facility' },
    ],
  },
  {
    slug: 'bommasandra-fulfillment-center',
    name: 'Bommasandra Fulfillment Center',
    location: 'bommasandra',
    type: 'fulfillment',
    availability: 'limited',
    summary:
      'Order-handling space on the Hosur Road corridor, south of the city.',
    overview: [
      'A facility on the Bommasandra stretch of NH-44, set up for order-level work rather than bulk storage alone. The floor supports a split between reserve stock and an active pick face, with room for packing and dispatch staging.',
      'There is a separate lane for returns and reprocessing, so reverse flow does not end up cutting across outbound during a busy shift.',
    ],
    features: [
      'Reserve stock separated from the pick face',
      'Room for picking, packing and dispatch',
      'Dedicated returns and reprocessing lane',
      'Headroom for festive and peak volumes',
      'On the NH-44 southern corridor',
      'Suits e-commerce and retail fulfillment',
    ],
    suitableFor: ['Fulfillment', 'Storage'],
    image: rackingInventory,
    imageAlt: 'Racking bays holding inventory at the Bommasandra fulfillment center',
    gallery: [
      { src: rackingInventory, alt: 'Palletised inventory across multi-level racking' },
      { src: rackingAisle, alt: 'Pick face aisle running the depth of the building' },
      { src: interiorColumns, alt: 'Storage floor with structural columns and high bay lighting' },
      { src: cratesStacked, alt: 'Crates staged for pick, pack and dispatch' },
    ],
  },
  {
    slug: 'soukya-road-warehouse',
    name: 'Soukya Road Warehouse',
    location: 'whitefield',
    type: 'ready-to-move',
    availability: 'available',
    summary:
      'Completed space on the east side of Bengaluru, near Budigere Cross.',
    overview: [
      'A finished warehouse on Soukya Road, for businesses that need to stay on the eastern side of the city rather than move out to an outer corridor. It is ready to occupy.',
      'The floor plate suits general storage and light order handling, with loading arranged so a single operation can run inbound and outbound through the same elevation.',
    ],
    features: [
      'Ready to occupy',
      'Floor plate suited to general storage',
      'Loading on one elevation',
      'Close to eastern Bengaluru demand',
      'On-site space for vehicle staging',
      'Suits storage and light fulfillment',
    ],
    suitableFor: ['Storage', 'Fulfillment'],
    image: interiorBright,
    imageAlt: 'Bright, empty warehouse floor at the Soukya Road facility',
    gallery: [
      { src: interiorBright, alt: 'Empty warehouse floor with reflective flooring' },
      { src: facadeRoof, alt: 'Roofline and cladding of the warehouse building' },
      { src: industrialFacade, alt: 'Elevation and cladding detail of the building' },
      { src: rackingSteel, alt: 'Steel racking installed within the storage floor' },
    ],
  },
  {
    slug: 'dabaspet-built-to-suit-campus',
    name: 'Dabaspet Built-to-Suit Campus',
    location: 'dabaspet',
    type: 'built-to-suit',
    availability: 'planned',
    summary:
      'Development site on the Tumakuru corridor, available to build to requirement.',
    overview: [
      'A site on the Dabaspet stretch of NH-48 that can be developed around a specific operation. Clear height, dock configuration, floor loading and circulation are set against your requirement instead of being fixed in advance.',
      'Because it is planned rather than built, the programme is agreed with the occupier and handover can be phased to match how you intend to start.',
    ],
    features: [
      'Developed around a defined requirement',
      'Clear height and docks to specification',
      'Handover phased against your plan',
      'Room to expand on the same site',
      'On the NH-48 northern corridor',
      'Suits long-term, committed occupation',
    ],
    suitableFor: ['Built-to-suit', 'Distribution'],
    image: industrialFacade,
    imageAlt: 'Modern industrial elevation of the type developed at the Dabaspet campus',
    gallery: [
      { src: industrialFacade, alt: 'Industrial building elevation and cladding' },
      { src: hallTrusses, alt: 'Structural steel frame during the fit-out stage' },
      { src: facadeRoof, alt: 'Cladding and roofline detail' },
      { src: containerTruck, alt: 'Container-bodied vehicle at the site entrance' },
    ],
  },
  {
    slug: 'attibele-storage-facility',
    name: 'Attibele Storage Facility',
    location: 'attibele',
    type: 'ready-to-move',
    availability: 'limited',
    summary:
      'Storage-led space near the Karnataka and Tamil Nadu border, on the Hosur corridor.',
    overview: [
      'A completed facility at Attibele on NH-44, positioned for operations moving goods between Bengaluru and the Hosur industrial belt. The building favours bulk storage with straightforward vehicle access.',
      'It suits businesses holding buffer stock close to both a manufacturing base and the city, without committing to a full distribution footprint.',
    ],
    features: [
      'Storage-led floor plate',
      'Straightforward vehicle access',
      'Sits between Bengaluru and Hosur',
      'Good for buffer and overflow stock',
      'Direct access to the NH-44 corridor',
      'Available to occupy now',
    ],
    suitableFor: ['Storage'],
    image: hallTrusses,
    imageAlt: 'Steel-framed storage hall at the Attibele facility',
    gallery: [
      { src: hallTrusses, alt: 'Steel-framed hall with clear span roof' },
      { src: interiorColumns, alt: 'Storage floor with structural columns' },
      { src: exteriorDusk, alt: 'Facility exterior with vehicle apron at dusk' },
      { src: palletsStacked, alt: 'Pallets staged alongside the storage floor' },
    ],
  },
  {
    slug: 'doddaballapur-distribution-hub',
    name: 'Doddaballapur Distribution Hub',
    location: 'doddaballapur',
    type: 'distribution',
    availability: 'planned',
    summary:
      'Planned distribution facility on the northern airport corridor.',
    overview: [
      'Planned for the Doddaballapur corridor in Bengaluru North, for operations that need to sit on the airport side of the city while keeping road access to the wider region.',
      'The layout is being planned around vehicle throughput, with dock capacity and staging depth agreed before construction rather than retrofitted once it is too late to change.',
    ],
    features: [
      'Planned around vehicle throughput',
      'Dock capacity agreed before construction',
      'Northern corridor and airport-side access',
      'Staging depth planned behind the docks',
      'Handover can be phased',
      'Suits distribution operations',
    ],
    suitableFor: ['Distribution'],
    image: railFreight,
    imageAlt: 'Container freight movement of the type planned at the Doddaballapur hub',
    gallery: [
      { src: railFreight, alt: 'Container freight train alongside stacked containers' },
      { src: railWagons, alt: 'Freight wagons standing in the rail yard' },
      { src: truckHighway, alt: 'Goods vehicle on the northern corridor' },
      { src: containerYard, alt: 'Containers staged for onward movement' },
    ],
  },
  {
    slug: 'peenya-industrial-warehouse',
    name: 'Peenya Industrial Warehouse',
    location: 'peenya',
    type: 'ready-to-move',
    availability: 'available',
    summary:
      'In-city warehousing inside the Peenya belt, close to manufacturing units.',
    overview: [
      'A completed warehouse inside the Peenya industrial area, which keeps stock near manufacturing units and near the city rather than out on a corridor. It suits operations that need short internal transfers.',
      'It works for raw material and finished goods buffering for businesses producing nearby, with access onto the Tumkur Road corridor when goods need to go out.',
    ],
    features: [
      'Inside an established industrial belt',
      'Short transfer distances to nearby units',
      'Good for raw material and finished goods buffering',
      'Access onto the Tumkur Road corridor',
      'Available to occupy now',
      'Practical for in-city distribution',
    ],
    suitableFor: ['Storage', 'Manufacturing support'],
    image: interiorColumns,
    imageAlt: 'Interior of the Peenya industrial warehouse with structural columns',
    gallery: [
      { src: interiorColumns, alt: 'Warehouse interior with columns and high bay lighting' },
      { src: rackingAisle, alt: 'Racking aisle within the storage floor' },
      { src: facadeRoof, alt: 'Building roofline and cladding' },
      { src: interiorOpen, alt: 'Clear floor area ready for racking' },
    ],
  },
]

export const findWarehouse = (slug) => warehouses.find((w) => w.slug === slug)

export const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value

export const locationFor = (value) => locations.find((l) => l.value === value)

/** Facilities in the same corridor, or of the same type, excluding the current one. */
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
  specTemplate(labelFor(warehouseTypes, warehouse.type), locationFor(warehouse.location)?.corridor ?? ON_REQUEST)
