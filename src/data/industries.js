import ecomImg from '@/assets/images/racking-inventory.webp'
import retailImg from '@/assets/images/racking-aisle.webp'
import fmcgImg from '@/assets/images/pallets-stacked.webp'
import mfgImg from '@/assets/images/facility-interior-columns.webp'
import autoImg from '@/assets/images/racking-steel-empty.webp'
import logiImg from '@/assets/images/truck-highway.webp'
import goodsImg from '@/assets/images/crates-stacked.webp'
import quickImg from '@/assets/images/truck-at-facility.webp'

// What each sector actually needs from a warehouse. No customer names, logos or
// engagement claims. Gray Brick has not published any, and inventing them would
// be the fastest way to lose an enquiry.

export const industries = [
  {
    id: 'e-commerce',
    icon: 'cart',
    title: 'E-Commerce',
    summary: 'Order-level throughput, with room for the spikes.',
    description:
      'Inventory has to move quickly and consistently. The pick face decides the day, so space is arranged with fast-moving stock near dispatch, reserve stock behind it, and a returns lane that does not get in the way of outbound.',
    needs: ['High SKU counts', 'Peak-season headroom', 'Returns processing', 'Late dispatch cut-offs'],
    image: ecomImg,
    imageAlt: 'Racking holding picked stock in an e-commerce fulfillment facility',
  },
  {
    id: 'quick-commerce',
    icon: 'clock',
    title: 'Quick Commerce',
    summary: 'Closer to demand, and easy to run at odd hours.',
    description:
      'Fast-moving operations depend on being near the customer zones they serve. What matters is a location that shortens the trip, a floor that can be re-zoned as the assortment changes, and access that works outside normal business hours.',
    needs: ['Proximity to demand', 'Frequent inventory movement', 'Re-zonable floor', 'Access outside office hours'],
    image: quickImg,
    imageAlt: 'Goods vehicle loading at a facility for onward local delivery',
  },
  {
    id: 'retail',
    icon: 'store',
    title: 'Retail',
    summary: 'Store replenishment that runs to a predictable schedule.',
    description:
      'Retail networks need stock staged against delivery routes rather than parked in bulk. Space is arranged for consolidation, route-wise staging and dispatch windows that repeat the same way every week.',
    needs: ['Route-wise staging', 'Consolidation space', 'Predictable replenishment', 'Seasonal overflow'],
    image: retailImg,
    imageAlt: 'Wide racking aisle holding retail stock ready for replenishment',
  },
  {
    id: 'fmcg',
    icon: 'package',
    title: 'FMCG',
    summary: 'High volumes moving in and out, every day.',
    description:
      'Fast-moving goods reward layouts that cut travel distance and protect rotation. Palletised bulk sits behind an active pick face, and dock capacity has to be sized for inbound and outbound happening at the same time.',
    needs: ['Pallet-in, pallet-out flow', 'Stock rotation discipline', 'Continuous dock activity', 'Bulk plus pick face'],
    image: fmcgImg,
    imageAlt: 'Pallets staged outside a warehouse facility',
  },
  {
    id: 'manufacturing',
    icon: 'factory',
    title: 'Manufacturing',
    summary: 'Buffers for raw material and finished goods, close to the line.',
    description:
      'Production runs better when input and output buffers sit off the shop floor. A warehouse near the plant absorbs inbound batches and holds finished goods until they are called forward, which keeps the line from being used as storage.',
    needs: ['Raw material buffer', 'Finished goods holding', 'Proximity to the plant', 'Heavy floor loading'],
    image: mfgImg,
    imageAlt: 'Industrial warehouse interior with structural columns and high clear height',
  },
  {
    id: 'automotive',
    icon: 'car',
    title: 'Automotive',
    summary: 'Parts held to a service commitment you have already made.',
    description:
      'Aftermarket and line-side supply both come down to finding a part quickly. Racking profiles, bin-level storage and controlled access matter far more here than raw floor area.',
    needs: ['Bin-level storage', 'Mixed racking profiles', 'Controlled access', 'Service-level dispatch'],
    image: autoImg,
    imageAlt: 'Steel racking configured for parts and spares storage',
  },
  {
    id: 'logistics',
    icon: 'truck',
    title: 'Logistics & 3PL',
    summary: 'Several clients under one roof, cleanly separated.',
    description:
      'Third-party operators need a floor that can be partitioned by client without rebuilding the shell, and enough yard to keep vehicles moving through the day. Tenure flexibility usually matters as much as the space itself.',
    needs: ['Partitionable floor', 'Yard and turnaround space', 'Dock capacity', 'Flexible tenure'],
    image: logiImg,
    imageAlt: 'Goods carrier moving containerised freight along a highway',
  },
  {
    id: 'consumer-goods',
    icon: 'tag',
    title: 'Consumer Goods',
    summary: 'Mixed formats, and space to do the finishing work.',
    description:
      'Consumer goods rarely turn up in neat, pallet-sized boxes. Facilities need to take mixed formats, protect higher-value stock, and leave room for kitting or bundling before dispatch.',
    needs: ['Mixed-format storage', 'Protected stock areas', 'Kitting and bundling space', 'Damage-controlled handling'],
    image: goodsImg,
    imageAlt: 'Stacked crates holding packaged consumer goods ready for dispatch',
  },
]

export const industryById = Object.fromEntries(industries.map((i) => [i.id, i]))
