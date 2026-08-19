import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/common/Logo'
import { addressLines, company, hasEmail, hasPhone } from '@/data/company'
import { primaryNav } from '@/data/navigation'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'

/**
 * Full-height navigation drawer.
 *
 * Stays mounted so it can animate both ways, but is `visibility: hidden` when
 * closed, which takes its links out of the tab order without extra bookkeeping.
 */
export function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)

  useLockBodyScroll(open)
  useFocusTrap(open, panelRef)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <>
      {open ? (
        <button
          type="button"
          className="gb-overlay cursor-default bg-gb-black/70 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          tabIndex={-1}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={panelRef}
        id="gb-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        data-open={open}
        className="gb-drawer flex w-[min(22rem,88vw)] flex-col overflow-y-auto overscroll-contain border-l border-gb-line bg-gb-charcoal shadow-gb-panel lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-gb-line px-5 py-4">
          <Logo className="h-7" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-gb-sm border border-gb-line text-gb-silver transition-colors duration-200 hover:border-gb-gold hover:text-gb-gold"
          >
            <Icon name="close" className="h-5 w-5" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav aria-label="Primary" className="px-5 py-6">
          <ul className="flex flex-col">
            {primaryNav.map((item, index) => (
              <li key={item.to} className="border-b border-gb-line last:border-b-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-baseline gap-4 py-4 text-xl font-semibold tracking-tight transition-colors duration-200',
                      isActive ? 'text-gb-gold' : 'text-gb-silver-light hover:text-gb-gold-light',
                    )
                  }
                >
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-gb-silver-dark">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-6 border-t border-gb-line px-5 py-6">
          <Button to="/warehouses" variant="gold" size="md" withArrow onClick={onClose} className="w-full">
            Find a warehouse
          </Button>

          <address className="not-italic">
            <p className="text-eyebrow uppercase text-gb-silver-dark">Office</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-gb-silver">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            {hasPhone ? (
              <a
                href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                className="mt-3 inline-block text-[0.8125rem] text-gb-gold"
              >
                {company.contact.phone}
              </a>
            ) : null}
            {hasEmail ? (
              <a
                href={`mailto:${company.contact.email}`}
                className="mt-1 block text-[0.8125rem] text-gb-gold"
              >
                {company.contact.email}
              </a>
            ) : null}
          </address>

          {company.social.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-2">
              {company.social.map((profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${company.shortName} on ${profile.label}`}
                    className="gb-social relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-gb-sm border border-gb-line text-gb-silver transition-colors duration-300 hover:border-gb-gold hover:text-gb-black"
                  >
                    <Icon name={profile.icon} className="relative z-10 h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  )
}
