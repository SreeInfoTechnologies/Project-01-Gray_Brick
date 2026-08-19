// ---------------------------------------------------------------------------
// Verified company information.
//
// Nothing in this file may be invented. Fields that Gray Brick has not yet
// supplied are `null`, and every component that consumes them renders a
// graceful fallback rather than a placeholder. Filling a value in here makes
// it appear across the whole site: navigation, footer, contact page and the
// structured data block.
// ---------------------------------------------------------------------------

export const company = {
  legalName: 'Gray Brick Infra Pvt. Ltd.',
  shortName: 'Gray Brick',
  wordmark: { primary: 'GRAY BRICK', secondary: 'INFRA PVT LTD' },

  positioning:
    'Gray Brick Infra helps businesses find warehouse space in and around Bengaluru that fits the way they actually operate. Ready-to-move facilities, built-to-suit developments, and the fulfillment and distribution setups behind them.',

  shortStatement:
    'Warehouse space in and around Bengaluru. Ready-to-move, built-to-suit, fulfillment and distribution.',

  address: {
    building: '852, 7th A Main',
    landmark: 'Opp. Syndicate Bank Road',
    locality: 'Subbaiahnapalya, Banaswadi',
    city: 'Bengaluru North',
    region: 'Karnataka',
    postalCode: '560043',
    country: 'India',
  },

  // TODO(gray-brick): add the published business phone and email. Until these
  // are set the site directs enquiries through the form instead of showing a
  // placeholder number.
  contact: {
    phone: null,
    email: null,
  },

  // TODO(gray-brick): replace each `href` with the company's own profile URL,
  // and delete any platform Gray Brick does not actually maintain. Each entry
  // renders its brand icon in the footer and in the mobile drawer; an empty
  // array hides the block entirely.
  social: [
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
    { label: 'X', icon: 'x', href: 'https://x.com/' },
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
  ],

  workingHours: 'Monday to Saturday, 9:30 am to 6:30 pm IST',

  // Leadership. Name and portrait supplied by Gray Brick.
  //
  // TODO(gray-brick): confirm the designation. The supplied portrait file was
  // named Ceo-Gray-Brick.png, so Chief Executive Officer is used here. If the
  // correct title is Managing Director, Founder or Director, change this one
  // string and it updates on the page and in the image alt text.
  //
  // `message` is deliberately null. A sentence in his own words would carry
  // real weight here, but writing one for him would be putting words in a real
  // person's mouth. Add it and the paragraph appears; leave it and the block
  // renders name and title only.
  leadership: {
    name: 'B Y Jayanth Reddy',
    title: 'Chief Executive Officer',
    message: null,
  },
}

/** Address as an ordered list of lines, for rendering and for schema.org. */
export const addressLines = [
  company.address.building,
  company.address.landmark,
  company.address.locality,
  `${company.address.city} – ${company.address.postalCode}`,
]

export const addressSingleLine = [
  company.address.building,
  company.address.landmark,
  company.address.locality,
  company.address.city,
  company.address.region,
  company.address.postalCode,
  company.address.country,
].join(', ')

/**
 * Google's documented Maps URL API pointed at the real office address. No API
 * key, no fabricated place ID. It resolves the address the same way a search
 * on maps.google.com would.
 */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressSingleLine,
)}`

export const hasPhone = Boolean(company.contact.phone)
export const hasEmail = Boolean(company.contact.email)
