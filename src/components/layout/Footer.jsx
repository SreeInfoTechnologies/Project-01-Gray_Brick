import { Link } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/common/Logo'
import { addressLines, company, directionsUrl, hasEmail, hasPhone } from '@/data/company'
import { footerNav, legalNav } from '@/data/navigation'

const year = new Date().getFullYear()

// The studio that designed and built the site.
const studioCredit = {
  name: 'Sree Info Technologies',
  href: 'https://sreeinfotechnologies.com/',
}

export function Footer() {
  return (
    <footer className="gb-brick relative border-t border-gb-line bg-gb-black">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Link to="/" className="inline-flex w-fit rounded-gb-xs" aria-label={`${company.legalName}, home page`}>
              <Logo layout="stacked" className="h-24" />
            </Link>

            <p className="gb-measure-tight text-[0.9375rem] leading-relaxed text-gb-silver">
              {company.shortStatement}
            </p>

            {company.social.length > 0 ? (
              <div className="mt-1">
                <p className="text-eyebrow uppercase text-gb-silver-dark">Follow Gray Brick</p>
                <ul className="mt-4 flex flex-wrap items-center gap-2.5">
                  {company.social.map((profile) => (
                    <li key={profile.label}>
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${company.shortName} on ${profile.label}`}
                        className="gb-social group/social relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-gb-sm border border-gb-line text-gb-silver transition-[color,border-color,transform] duration-300 ease-[var(--ease-gb)] hover:-translate-y-0.5 hover:border-gb-gold hover:text-gb-black focus-visible:-translate-y-0.5"
                      >
                        <Icon name={profile.icon} className="relative z-10 h-[18px] w-[18px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:gap-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-eyebrow uppercase text-gb-gold">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[0.875rem] leading-snug text-gb-silver transition-colors duration-200 hover:text-gb-silver-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow uppercase text-gb-gold">Office</h2>

            <address className="mt-5 not-italic">
              <p className="text-[0.875rem] leading-relaxed text-gb-silver">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {hasPhone ? (
                  <a
                    href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-[0.875rem] text-gb-silver transition-colors duration-200 hover:text-gb-gold"
                  >
                    <Icon name="phone" className="h-4 w-4 text-gb-gold" />
                    {company.contact.phone}
                  </a>
                ) : null}

                {hasEmail ? (
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="flex items-center gap-2 text-[0.875rem] text-gb-silver transition-colors duration-200 hover:text-gb-gold"
                  >
                    <Icon name="mail" className="h-4 w-4 text-gb-gold" />
                    {company.contact.email}
                  </a>
                ) : null}

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-fit items-center gap-2 text-[0.875rem] text-gb-silver transition-colors duration-200 hover:text-gb-gold"
                >
                  <Icon name="pin" className="h-4 w-4 text-gb-gold" />
                  Get directions
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </address>
          </div>
        </div>
      </Container>

      {/* Bottom bar. Three parts on one line from lg up: copyright left, the
          studio credit centred, legal links right. A three-column grid rather
          than justify-between, so the credit sits on the true centre however
          wide the other two are. Below lg the three stack, left-aligned. */}
      <div className="border-t border-gb-line">
        <Container className="grid gap-4 py-6 lg:grid-cols-3 lg:items-center">
          <p className="text-[0.8125rem] leading-5 text-gb-silver-dark">
            © {year} {company.legalName} All rights reserved.
          </p>

          <p className="text-[0.8125rem] leading-5 text-gb-silver-dark lg:justify-self-center">
            Designed by{' '}
            {/* rel without noreferrer, so the studio's analytics can see the
                visit came from this site. */}
            <a
              href={studioCredit.href}
              target="_blank"
              rel="noopener"
              className="group/credit inline-flex items-center gap-1 font-medium text-gb-silver transition-colors duration-200 hover:text-gb-gold-soft focus-visible:text-gb-gold-soft"
            >
              {studioCredit.name}
              <Icon
                name="arrowUpRight"
                className="h-3 w-3 opacity-60 transition-[opacity,transform] duration-200 group-hover/credit:translate-x-px group-hover/credit:-translate-y-px group-hover/credit:opacity-100"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-self-end">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block text-[0.8125rem] leading-5 text-gb-silver-dark transition-colors duration-200 hover:text-gb-silver-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
