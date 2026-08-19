import { LegalPage } from '@/components/common/LegalPage'
import { addressSingleLine, company } from '@/data/company'

// NOTE FOR THE GRAY BRICK TEAM: these are plain, factual terms for an
// informational website. Have counsel review them before launch, and update
// them if the site starts taking bookings, payments or account sign-ups.
const sections = [
  {
    heading: 'About these terms',
    body: [
      `This website is operated by ${company.legalName}. By using it, you agree to the terms set out on this page.`,
    ],
  },
  {
    heading: 'Information on this site',
    body: [
      'The facility listings, solution descriptions and other content on this website are provided for information. They describe the kind of space and support we offer, and are not an offer, a quotation or a contract.',
      'Availability, measured specifications and commercial terms are confirmed directly with our team and may change without notice.',
    ],
  },
  {
    heading: 'Enquiries',
    body: [
      'Submitting an enquiry does not reserve a facility or create any obligation on either side. It starts a conversation.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `The Gray Brick name, logo and the design of this website belong to ${company.legalName}. Please do not reproduce them without permission.`,
    ],
  },
  {
    heading: 'Links to other sites',
    body: [
      'Where this site links to a third-party service, such as a mapping provider, that service has its own terms and we are not responsible for its content.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about these terms can be sent to us at our office:',
      addressSingleLine,
    ],
  },
]

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      description={`Terms governing the use of the ${company.legalName} website.`}
      path="/terms"
      updated="August 2026"
      sections={sections}
    />
  )
}
