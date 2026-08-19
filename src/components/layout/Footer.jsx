import { Link } from 'react-router-dom'

import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/common/Logo'
import { addressLines, company, directionsUrl, hasEmail, hasPhone } from '@/data/company'
import { footerNav, legalNav } from '@/data/navigation'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-gb-line-dark bg-gb-graphite">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Link to="/" className="inline-flex w-fit rounded-gb-xs" aria-label={`${company.legalName}, home page`}>
              <Logo variant="light" layout="stacked" className="h-24" />
            </Link>

            <p className="gb-measure-tight text-[0.9375rem] leading-relaxed text-gb-silver">
              {company.shortStatement}
            </p>

            {company.social.length > 0 ? (
              <div className="mt-1">
                <p className="text-eyebrow uppercase text-gb-concrete-light">Follow Gray Brick</p>
                <ul className="mt-4 flex flex-wrap items-center gap-2.5">
                  {company.social.map((profile) => (
                    <li key={profile.label}>
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${company.shortName} on ${profile.label}`}
                        className="gb-social group/social relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-gb-sm border border-gb-line-dark text-gb-silver transition-[color,border-color,transform] duration-300 ease-[var(--ease-gb)] hover:-translate-y-0.5 hover:border-gb-gold hover:text-gb-graphite focus-visible:-translate-y-0.5"
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
                        className="text-[0.875rem] leading-snug text-gb-silver transition-colors duration-200 hover:text-gb-white"
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

      <div className="border-t border-gb-line-dark">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-gb-concrete-light">
            © {year} {company.legalName} All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-[0.8125rem] text-gb-concrete-light transition-colors duration-200 hover:text-gb-silver-light"
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
