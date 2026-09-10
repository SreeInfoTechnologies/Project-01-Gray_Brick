import { LegalPage } from '@/components/common/LegalPage'
import { addressSingleLine, company } from '@/data/company'
import { partners } from '@/data/partners'

// NOTE FOR THE GRAY BRICK TEAM: plain terms for an informational website.
// Update them if the site starts taking bookings, payments or sign-ups, and
// have counsel review them before relying on them.

const partnerNames = partners.map((partner) => partner.name)
const partnerList = `${partnerNames.slice(0, -1).join(', ')} and ${partnerNames.at(-1)}`

const sections = [
  {
    heading: 'About these terms',
    body: [
      `This website is operated by ${company.legalName} ("Gray Brick", "we", "us"), with its registered office at ${addressSingleLine}.`,
      'By using the website you agree to these terms. If you do not agree, please do not use it.',
    ],
  },
  {
    heading: 'Information on this website',
    body: [
      'Facility listings, solution descriptions and everything else on this website are for general information. They describe the space and support we offer. They are not an offer, a quotation or a contract.',
      'Availability, measured specifications and commercial terms are confirmed directly by our team and can change without notice. Photographs show Gray Brick facilities as they were when photographed.',
    ],
  },
  {
    heading: 'Enquiries and site visits',
    body: [
      'Sending an enquiry does not reserve a facility or create an obligation for either side. It starts a conversation. Any agreement for space is made separately, in writing.',
      'Please make sure the details you send us are accurate and that you are entitled to share them.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: ['When using this website, you agree not to:'],
    list: [
      'Use it for anything unlawful, or send false or misleading information through it',
      'Try to gain unauthorised access to it, or interfere with how it works',
      'Introduce viruses or other harmful code',
      'Copy or scrape its content in bulk by automated means',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `The Gray Brick name and logo, the photographs and text on this website, and its design belong to ${company.legalName}, and may not be reproduced without our written permission.`,
      `${partnerList} are trademarks of their respective owners. They appear on this website to identify companies we work with, and their use does not mean those companies endorse this website.`,
    ],
  },
  {
    heading: 'Links to other websites',
    body: [
      'Where this website links to another service, such as Google Maps, that service has its own terms and privacy policy. We are not responsible for its content.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'We work to keep this website accurate and available, but it is provided "as is", without warranties of any kind. To the extent the law allows, we are not liable for any loss arising from your use of it or reliance on its content.',
      'Nothing in these terms limits any liability that cannot be limited under Indian law.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. The date at the top of the page shows when they last changed, and continuing to use the website after a change means you accept it.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from them or from use of this website.',
    ],
  },
  {
    heading: 'Contact',
    body: ['Questions about these terms can be sent to our registered office:', addressSingleLine],
  },
]

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      description={`The terms that govern use of the ${company.legalName} website.`}
      path="/terms"
      updated="September 2026"
      intro="The rules for using this website: what its content is and is not, what we ask of visitors, and which law applies."
      sections={sections}
    />
  )
}
