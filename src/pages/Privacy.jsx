import { LegalPage } from '@/components/common/LegalPage'
import { addressSingleLine, company } from '@/data/company'

// NOTE FOR THE GRAY BRICK TEAM
//
// This describes exactly what the website does today: it collects the enquiry
// form fields and nothing else, sets no cookies and loads no analytics. If a
// chat widget, analytics or marketing tool is added, this page has to change
// with it.
//
// TODO(gray-brick): add a published email address in src/data/company.js and
// name a Grievance Officer. Both are expected of a business collecting personal
// data in India; until they exist, requests go to the registered office.
//
// Have counsel review this before relying on it.
const sections = [
  {
    heading: 'Who we are',
    body: [
      `${company.legalName} ("Gray Brick", "we", "us") operates this website. For the personal data you submit through it, we are the Data Fiduciary under India's Digital Personal Data Protection Act, 2023.`,
      `Our registered office is at ${addressSingleLine}.`,
    ],
  },
  {
    heading: 'What this policy covers',
    body: [
      'This policy covers information collected through this website. Agreements for warehouse space, site visits and other dealings with us are governed by their own terms.',
    ],
  },
  {
    heading: 'Information we collect',
    body: ['We collect only what you choose to send through an enquiry form:'],
    list: [
      'Your name and, if you give it, your company name',
      'Your email address and, if you give it, your phone number',
      'The requirement you select, such as preferred location, space and type of use',
      'The message you write to us, and the facility you enquired about, if any',
    ],
    after: [
      'Our hosting provider processes the IP address of every visitor in order to deliver the pages and protect the service from abuse. We do not receive that data or combine it with anything you send us.',
    ],
  },
  {
    heading: 'How we use it',
    body: ['Enquiry details are used to:'],
    list: [
      'Reply to your enquiry',
      'Identify facilities that may suit your requirement',
      'Arrange site visits and follow-up conversations',
      'Keep a record of the enquiry while it is active',
    ],
    after: [
      'We process this data on the basis of the consent you give when you submit the form. We do not use it for any other purpose, and we do not send marketing unless you ask for it.',
    ],
  },
  {
    heading: 'Sharing',
    body: [
      'We do not sell your personal data, and we do not share it with third parties for their marketing.',
      'It is shared only with service providers who help us run this website and receive enquiries, under instructions from us, and where the law requires us to disclose it.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry records are kept while they are relevant to an active or prospective requirement, and deleted once they are not, unless the law requires us to keep them longer.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'This website is served only over an encrypted (HTTPS) connection. We take reasonable security safeguards to protect enquiry data against unauthorised access, loss or misuse, and we limit access to the people who need it to answer you.',
    ],
  },
  {
    heading: 'Cookies and tracking',
    body: [
      'This website sets no cookies and does not use analytics, advertising or social media trackers. Its fonts are served from our own site, not from a third-party font service.',
      'Map links open Google Maps in a new tab. Google\'s own privacy policy applies once you are on their service.',
    ],
  },
  {
    heading: 'Your rights',
    body: ['Under the Digital Personal Data Protection Act, 2023, you can:'],
    list: [
      'Ask what personal data we hold about you and how it is being used',
      'Ask us to correct, complete or update it',
      'Ask us to erase it',
      'Withdraw your consent at any time, which stops further processing',
      'Nominate someone to exercise these rights on your behalf',
      'Raise a grievance with us, and if it is not resolved, complain to the Data Protection Board of India',
    ],
    after: [
      'Withdrawing consent does not affect anything done lawfully before you withdrew it.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'This website is meant for businesses. It is not directed at anyone under 18, and we do not knowingly collect personal data from children.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If we change how the website handles personal data, we will update this page and the date at the top of it.',
    ],
  },
  {
    heading: 'Contact and grievances',
    body: [
      'To use any of the rights above, or to raise a concern about how your data has been handled, write to us at our registered office:',
      addressSingleLine,
      `Office hours: ${company.workingHours}.`,
    ],
  },
]

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`How ${company.legalName} collects, uses and protects personal data submitted through this website, and your rights under the Digital Personal Data Protection Act, 2023.`}
      path="/privacy"
      updated="September 2026"
      intro="We collect very little: only what you type into an enquiry form, and only so we can answer it. This page sets out what that is, what we do with it, and what you can ask us to do."
      sections={sections}
    />
  )
}
