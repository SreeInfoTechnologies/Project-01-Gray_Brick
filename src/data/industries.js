// Each sector is illustrated by whichever of Gray Brick's own two facilities
// shows what that sector needs: quick commerce gets the 100 Feet Road frontage
// with rider vehicles at it, FMCG the cartoned mezzanine, manufacturing the
// empty clear-span floor. Six photographs cover eight sectors, so two of them
// appear twice; no two cards that sit side by side share a frame.
import mezzanineFmcg from '@/assets/images/gb-mezzanine-fmcg.webp'
import streetLoading from '@/assets/images/gb-street-loading.webp'
import frontageDusk from '@/assets/images/gb-frontage-dusk.webp'
import mezzanineStocked from '@/assets/images/gb-mezzanine-stocked.webp'
import floorReady from '@/assets/images/gb-floor-ready.webp'
import forecourtWide from '@/assets/images/gb-forecourt-wide.webp'

// What each sector actually needs from a warehouse. Sector requirements only —
// the confirmed partner list lives in src/data/partners.js and is rendered through
// PartnerLogos. No engagement claims are attached to a sector here.

export const industries = [
  {
    id: 'e-commerce',
    icon: 'cart',
    title: 'E-Commerce',
    summary: 'Order-level throughput, with room for the spikes.',
    description:
      'Inventory has to move quickly and consistently. The pick face decides the day, so space is arranged with fast-moving stock near dispatch, reserve stock behind it, and a returns lane that does not get in the way of outbound.',
    needs: ['High SKU counts', 'Peak-season headroom', 'Returns processing', 'Late dispatch cut-offs'],
    image: mezzanineFmcg,
    imageAlt: 'Cartoned stock across the mezzanine and picking floor at the HRBR Layout facility',
  },
  {
    id: 'quick-commerce',
    icon: 'clock',
    title: 'Quick Commerce',
    summary: 'Closer to demand, and easy to run at odd hours.',
    description:
      'Fast-moving operations depend on being near the customer zones they serve. What matters is a location that shortens the trip, a floor that can be re-zoned as the assortment changes, and access that works outside normal business hours.',
    needs: ['Proximity to demand', 'Frequent inventory movement', 'Re-zonable floor', 'Access outside office hours'],
    image: streetLoading,
    imageAlt: 'Rider vehicles loading at the 100 Feet Road frontage, inside the demand zone they serve',
  },
  {
    id: 'retail',
    icon: 'store',
    title: 'Retail',
    summary: 'Store replenishment that runs to a predictable schedule.',
    description:
      'Retail networks need stock staged against delivery routes rather than parked in bulk. Space is arranged for consolidation, route-wise staging and dispatch windows that repeat the same way every week.',
    needs: ['Route-wise staging', 'Consolidation space', 'Predictable replenishment', 'Seasonal overflow'],
    image: frontageDusk,
    imageAlt: 'Roller-shuttered frontage of a recently completed Gray Brick unit',
  },
  {
    id: 'fmcg',
    icon: 'package',
    title: 'FMCG',
    summary: 'High volumes moving in and out, every day.',
    description:
      'Fast-moving goods reward layouts that cut travel distance and protect rotation. Palletised bulk sits behind an active pick face, and dock capacity has to be sized for inbound and outbound happening at the same time.',
    needs: ['Pallet-in, pallet-out flow', 'Stock rotation discipline', 'Continuous dock activity', 'Bulk plus pick face'],
    image: mezzanineStocked,
    imageAlt: 'Palletised and cartoned fast-moving goods stacked across the storage floor',
  },
  {
    id: 'manufacturing',
    icon: 'factory',
    title: 'Manufacturing',
    summary: 'Buffers for raw material and finished goods, close to the line.',
    description:
      'Production runs better when input and output buffers sit off the shop floor. A warehouse near the plant absorbs inbound batches and holds finished goods until they are called forward, which keeps the line from being used as storage.',
    needs: ['Raw material buffer', 'Finished goods holding', 'Proximity to the plant', 'Heavy floor loading'],
    image: floorReady,
    imageAlt: 'Clear-span floor at the Horamavu facility, free of internal columns',
  },
  {
    id: 'automotive',
    icon: 'car',
    title: 'Automotive',
    summary: 'Parts held to a service commitment you have already made.',
    description:
      'Aftermarket and line-side supply both come down to finding a part quickly. Racking profiles, bin-level storage and controlled access matter far more here than raw floor area.',
    needs: ['Bin-level storage', 'Mixed racking profiles', 'Controlled access', 'Service-level dispatch'],
    image: forecourtWide,
    imageAlt: 'Front elevation of the Horamavu facility, with its covered loading opening and paved forecourt',
  },
  {
    id: 'logistics',
    icon: 'truck',
    title: 'Logistics & 3PL',
    summary: 'Several clients under one roof, cleanly separated.',
    description:
      'Third-party operators need a floor that can be partitioned by client without rebuilding the shell, and enough yard to keep vehicles moving through the day. Tenure flexibility usually matters as much as the space itself.',
    needs: ['Partitionable floor', 'Yard and turnaround space', 'Dock capacity', 'Flexible tenure'],
    image: streetLoading,
    imageAlt: 'Loading bay on 100 Feet Road, with stock on pallets and rider vehicles drawn up alongside',
  },
  {
    id: 'consumer-goods',
    icon: 'tag',
    title: 'Consumer Goods',
    summary: 'Mixed formats, and space to do the finishing work.',
    description:
      'Consumer goods rarely turn up in neat, pallet-sized boxes. Facilities need to take mixed formats, protect higher-value stock, and leave room for kitting or bundling before dispatch.',
    needs: ['Mixed-format storage', 'Protected stock areas', 'Kitting and bundling space', 'Damage-controlled handling'],
    image: floorReady,
    imageAlt: 'The empty clear-span floor at Horamavu, with room to lay out mixed-format storage',
  },
]

export const industryById = Object.fromEntries(industries.map((i) => [i.id, i]))
