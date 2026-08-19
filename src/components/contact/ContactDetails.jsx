import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'
import { addressLines, company, directionsUrl, hasEmail, hasPhone } from '@/data/company'

const steps = [
  'We read the requirement and check it against what is available right now.',
  'Someone from the team comes back with the facilities that actually fit.',
  'We arrange the site visits and share the measured specifications.',
]

/**
 * The non-form half of the contact page. Phone and email are rendered only
 * when they exist in company.js. Until then the enquiry form is presented as
 * the channel rather than a placeholder number being invented.
 */
export function ContactDetails() {
  return (
    <div className="flex flex-col gap-10">
      <div className="gb-ticks gb-card p-6 sm:p-8">
        <h2 className="text-eyebrow uppercase text-gb-gold">Office</h2>

        <address className="mt-5 not-italic">
          <p className="text-[1.0625rem] leading-relaxed font-medium text-gb-silver-light">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </address>

        <div className="mt-6 flex flex-col gap-3 border-t border-gb-line pt-6">
          {hasPhone ? (
            <a
              href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2.5 text-[0.9375rem] text-gb-silver transition-colors duration-200 hover:text-gb-gold"
            >
              <Icon name="phone" className="h-4 w-4 text-gb-gold" />
              {company.contact.phone}
            </a>
          ) : null}

          {hasEmail ? (
            <a
              href={`mailto:${company.contact.email}`}
              className="flex items-center gap-2.5 text-[0.9375rem] text-gb-silver transition-colors duration-200 hover:text-gb-gold"
            >
              <Icon name="mail" className="h-4 w-4 text-gb-gold" />
              {company.contact.email}
            </a>
          ) : null}

          <p className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-gb-silver">
            <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gb-gold" />
            {company.workingHours}
          </p>
        </div>

        <div className="mt-6">
          <Button href={directionsUrl} variant="outline" size="sm">
            Get directions
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-eyebrow uppercase text-gb-silver-dark">What happens after you send it</h2>
        <ol className="mt-5 flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-gb-line text-[0.6875rem] font-semibold text-gb-gold">
                {index + 1}
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-gb-silver">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
