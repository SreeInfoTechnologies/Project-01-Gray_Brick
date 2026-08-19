// Single source of truth for every link in the header, drawer and footer.
// If a route is not in here it does not exist in the navigation, and every
// entry below maps to a real route in App.jsx.

export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'Warehouses', to: '/warehouses' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
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
