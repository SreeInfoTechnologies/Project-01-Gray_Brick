// Photographs of Gray Brick's own two facilities. Each solution is illustrated
// by the building that actually demonstrates it — the empty Horamavu floor for
// ready-to-move, the newly finished frontage for built-to-suit, the stocked
// HRBR mezzanine for fulfillment, the 100 Feet Road loading bay for
// distribution, the working HRBR floor for support after handover. No stock
// photography, and no photograph twice: five solutions, five frames.
//
// One photograph per solution serves both the homepage card and the 3/2
// editorial row on the solutions page, so every file here is landscape.
import readyImg from '@/assets/images/gb-floor-ready.webp'
import builtImg from '@/assets/images/gb-frontage-dusk.webp'
import fulfilImg from '@/assets/images/gb-mezzanine-stocked.webp'
import distImg from '@/assets/images/gb-street-loading.webp'
import chainImg from '@/assets/images/gb-mezzanine-fmcg.webp'

// Capability descriptions only. No areas, counts, timelines or performance
// claims: those belong to a facility record or a conversation with the team.

export const solutions = [
  {
    id: 'ready-to-move',
    index: '01',
    icon: 'warehouse',
    category: 'Start quickly',
    title: 'Ready-to-Move Warehouses',
    summary: 'Space you can start using without waiting on construction.',
    description:
      'Need space you can start using quickly? These facilities are already complete. Structure, flooring, loading and access are in place, so what is left is racking and setting up your team. That keeps the gap between signing and running short.',
    points: [
      'Shorter gap between agreement and day one',
      'Structure, flooring and loading already done',
      'Works for storage, overflow and seasonal demand',
      'Useful when a new market has to open on a date',
    ],
    image: readyImg,
    imageAlt: 'The completed Horamavu floor in sealed red-oxide finish, empty and ready for racking',
  },
  {
    id: 'built-to-suit',
    index: '02',
    icon: 'blueprint',
    category: 'Built around you',
    title: 'Built-to-Suit Warehouses',
    summary: 'For operations that do not fit a standard shed.',
    description:
      'Some businesses do not fit a standard warehouse. If your operation needs a particular layout, clear height, dock arrangement or access, a built-to-suit facility starts with how goods actually move through your business. The building follows from there.',
    points: [
      'Layout planned around how your goods move',
      'Clear height and dock configuration to your requirement',
      'Handover phased against your operating plan',
      'Room to expand on the same site later',
    ],
    image: builtImg,
    imageAlt: 'Newly completed two-level frontage with roller shutters at a Gray Brick facility',
  },
  {
    id: 'fulfillment',
    index: '03',
    icon: 'package',
    category: 'Order handling',
    title: 'Fulfillment Centers',
    summary: 'Set up for picking, packing and daily dispatch.',
    description:
      'When orders move quickly, the warehouse has to keep up. These facilities are arranged for order-level work. Fast-moving stock sits near dispatch, reserve inventory goes behind it, and the returns lane stays clear of outbound.',
    points: [
      'Fast-moving stock kept close to dispatch',
      'Space for picking, packing and staging',
      'A returns lane kept clear of outbound',
      'Headroom for festive and peak volumes',
    ],
    image: fulfilImg,
    imageAlt: 'Cartoned reserve stock on the HRBR Layout mezzanine, above the active pick face',
  },
  {
    id: 'distribution',
    index: '04',
    icon: 'truck',
    category: 'Daily movement',
    title: 'Distribution Centers',
    summary: 'For businesses serving several stores, cities or delivery zones.',
    description:
      'If you are supplying multiple stores or markets, the distribution centre decides how manageable each day is. These facilities are dock-forward, with staging depth behind the dock line and a yard planned for the vehicles that actually come in.',
    points: [
      'Dock-forward layout so goods keep flowing',
      'Staging depth that keeps vehicles turning around',
      'Yard planned for freight movement, not car parking',
      'Sited on the corridors your trucks already use',
    ],
    image: distImg,
    imageAlt: 'Rider vehicles loading at the 100 Feet Road frontage of the HRBR Layout facility',
  },
  {
    id: 'supply-chain',
    index: '05',
    icon: 'network',
    category: 'After handover',
    title: 'Supply Chain Support',
    summary: 'Help through evaluation, documentation, handover and setup.',
    description:
      'Warehousing rarely goes wrong at the building. It goes wrong at the paperwork, the handover, and the first few weeks of running. We stay involved through site evaluation, documentation and operational setup, and you keep one point of contact after that.',
    points: [
      'Site evaluation against your actual requirement',
      'Coordination through documentation and handover',
      'Support while the operation is being set up',
      'One point of contact once you are running',
    ],
    image: chainImg,
    imageAlt: 'The HRBR Layout floor in operation: cartoned stock across the floor and mezzanine',
  },
]

/** The four propositions promoted on the homepage. */
export const homeSolutions = solutions.filter((s) => s.id !== 'supply-chain')

export const solutionById = Object.fromEntries(solutions.map((s) => [s.id, s]))

/** The flow that a stored unit travels through: used by the process diagram. */
export const supplyFlow = [
  {
    label: 'Warehousing',
    detail: 'Goods arrive, get checked, and go into the storage profile that suits them.',
  },
  {
    label: 'Inventory',
    detail: 'Stock is zoned and tracked, so what is on the floor matches what is on the system.',
  },
  {
    label: 'Fulfillment',
    detail: 'Orders are picked, packed and staged against the day\'s dispatch windows.',
  },
  {
    label: 'Distribution',
    detail: 'Consignments leave through docks planned for vehicles to turn around quickly.',
  },
]

/**
 * Questions the team actually gets asked. Answers describe how Gray Brick
 * works. None of them quote a figure, a timeline or a commitment that has not
 * been published.
 */
export const solutionFaqs = [
  {
    question: 'What is the difference between ready-to-move and built-to-suit?',
    answer:
      'A ready-to-move facility already exists. Structure, flooring and loading are done, so what is left is racking and getting your team in. Built-to-suit means the building is developed around your requirement, so clear height, dock configuration, floor loading and circulation get decided with you instead of inherited from whoever built it first.',
  },
  {
    question: 'Why are areas and clear heights not listed on the site?',
    answer:
      'Because a number on its own is misleading. We confirm measured specifications during site evaluation, after we understand what has to move through the building and have walked it with you. It keeps the shortlist honest and saves you visits to buildings that were never going to work.',
  },
  {
    question: 'Can one facility be shared between more than one operation?',
    answer:
      'Often, yes. Third-party operators usually need a floor that can be partitioned by client without rebuilding the shell, plus enough yard to keep vehicles moving. That comes down to the layout and dock arrangement of the particular building, so it is worth asking about the site itself.',
  },
  {
    question: 'How involved are you after we take the space?',
    answer:
      'We stay involved through documentation and handover, and through the setup of the operation itself. After that you keep one point of contact rather than being passed around.',
  },
  {
    question: 'Which parts of Bengaluru do you cover?',
    answer:
      'Our own facilities are on the north-east side of the city, at HRBR Layout on 100 Feet Road and at Horamavu on Narayana Reddy Layout Road. Beyond those we source across Kalyan Nagar and Banaswadi, Hennur, K R Puram and Whitefield, Hoskote, the Peenya belt, and the NH-48, NH-44 and airport corridors.',
  },
  {
    question: 'We have not finalised our requirement yet. Is it too early to talk?',
    answer:
      'No. Most of the useful conversations happen before a requirement is fixed. If you can tell us what arrives, how it is stored and how it goes out, we can usually tell you what kind of facility fits, including when the honest answer is smaller or cheaper than you expected.',
  },
]
