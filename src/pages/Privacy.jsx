import { LegalPage } from '@/components/common/LegalPage'
import { addressSingleLine, company } from '@/data/company'

// NOTE FOR THE GRAY BRICK TEAM: this describes exactly what the website does
// today. It collects enquiry form fields and nothing else. If analytics, chat
// widgets or marketing tools are added later, this page must be updated, and
// it is worth having counsel review it before launch.
const sections = [
  {
    heading: 'What this policy covers',
    body: [
      `This policy explains how ${company.legalName} handles information submitted through this website. It applies to this website only.`,
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'We collect only what you choose to send us through an enquiry form. That is:',
    ],
    list: [
      'Your name and, if you provide it, your company name',
      'Your email address and, if you provide it, your phone number',
      'The requirement details you select, such as preferred location, space requirement and type of use',
      'The message you write to us',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Enquiry details are used to respond to you, to identify facilities that may suit the requirement, and to arrange site visits or follow-up conversations.',
      'We do not sell your information, and we do not share it with third parties for marketing.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry records are retained for as long as they remain relevant to an active or prospective requirement, and are removed once they are not.',
    ],
  },
  {
    heading: 'Cookies and tracking',
    body: [
      'This website does not set advertising or tracking cookies, and does not embed third-party analytics or social media trackers.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask us what enquiry information we hold about you, ask us to correct it, or ask us to delete it. Write to us at the office address below and we will action the request.',
      addressSingleLine,
    ],
  },
]

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`How ${company.legalName} handles information submitted through this website.`}
      path="/privacy"
      updated="August 2026"
      sections={sections}
    />
  )
}
