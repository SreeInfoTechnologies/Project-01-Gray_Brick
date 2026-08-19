import { industries } from './industries'
import { solutions } from './solutions'
import { locations, warehouseTypes } from './warehouses'

// Single source of truth for every link in the header, drawer and footer.
// If a route is not in here it does not exist in the navigation, and every
// entry below maps to a real route in App.jsx.
//
// The header submenus are DERIVED from the data that already drives the pages
// they point at, so a new solution, industry, facility type or corridor shows
// up in the navigation without anyone remembering to add it twice. The
// warehouse links use ?type= and ?location=, which the listing page already
// reads and reflects in its filter controls.

const solutionLinks = solutions.map((solution) => ({
  label: solution.title,
  to: `/solutions#${solution.id}`,
  hint: solution.category,
}))

const industryLinks = industries.map((industry) => ({
  label: industry.title,
  to: `/industries#${industry.id}`,
}))

const typeLinks = warehouseTypes.map((type) => ({
  label: type.label,
  to: `/warehouses?type=${type.value}`,
}))

const corridorLinks = locations.map((location) => ({
  label: location.label,
  to: `/warehouses?location=${location.value}`,
  hint: location.corridor,
}))

export const primaryNav = [
  { label: 'Home', to: '/' },
  {
    label: 'Warehouses',
    to: '/warehouses',
    menu: {
      groups: [
        { title: 'By facility type', links: typeLinks },
        { title: 'By corridor', links: corridorLinks, columns: 2 },
      ],
      footer: { label: 'See every facility', to: '/warehouses' },
    },
  },
  {
    label: 'Solutions',
    to: '/solutions',
    menu: {
      groups: [{ title: 'Ways to take space', links: solutionLinks }],
      footer: { label: 'Compare all solutions', to: '/solutions' },
    },
  },
  {
    label: 'Industries',
    to: '/industries',
    menu: {
      groups: [{ title: 'Sectors we plan around', links: industryLinks, columns: 2 }],
      footer: { label: 'See every sector', to: '/industries' },
    },
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Warehouses', to: '/warehouses' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Ready-to-Move Warehouses', to: '/solutions#ready-to-move' },
      { label: 'Built-to-Suit Warehouses', to: '/solutions#built-to-suit' },
      { label: 'Fulfillment Centers', to: '/solutions#fulfillment' },
      { label: 'Distribution Centers', to: '/solutions#distribution' },
      { label: 'Supply Chain Support', to: '/solutions#supply-chain' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'E-Commerce', to: '/industries#e-commerce' },
      { label: 'Quick Commerce', to: '/industries#quick-commerce' },
      { label: 'Retail', to: '/industries#retail' },
      { label: 'FMCG', to: '/industries#fmcg' },
      { label: 'Manufacturing', to: '/industries#manufacturing' },
      { label: 'Logistics & 3PL', to: '/industries#logistics' },
    ],
  },
]

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
]
