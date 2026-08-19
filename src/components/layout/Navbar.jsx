import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/common/Logo'
import { company } from '@/data/company'
import { primaryNav } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/cn'

/**
 * Global header. Sits transparent over the hero photograph at the top of every
 * page and resolves to a solid graphite bar once the page scrolls, so the
 * navigation is always legible without ever obscuring the opening image.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(24)
  const progressRef = useScrollProgress()
  const { pathname } = useLocation()

  // Close the drawer whenever the route changes, including on browser
  // back/forward. Adjusting state during render is the documented pattern for
  // this and avoids an extra commit.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'gb-header transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-gb)]',
          scrolled
            ? 'border-b border-gb-line-dark bg-gb-graphite/95 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container className="gb-header__inner flex items-center justify-between gap-4">
          <Link
            to="/"
            className="shrink-0 rounded-gb-xs"
            aria-label={`${company.legalName}, home page`}
          >
            <Logo variant="light" className="h-7 sm:h-8" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-block py-2 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-200',
                        isActive ? 'text-gb-white' : 'text-gb-silver hover:text-gb-white',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <span data-active={isActive} className="gb-underline">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wrapped rather than given `hidden sm:inline-flex` directly: the
                button's own `inline-flex` would win the cascade against
                `hidden` and the CTA would never hide on small screens. */}
            <div className="hidden sm:block">
              <Button to="/warehouses" variant="gold" size="sm" withArrow>
                Find a warehouse
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="gb-mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-gb-sm border border-gb-line-dark-strong text-gb-white transition-colors duration-200 hover:border-gb-gold hover:text-gb-gold lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </button>
          </div>
        </Container>

        {/* Reading progress. Renders as a hairline of gold under the bar and
            only once the header has gone solid, so it never sits over the hero. */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 bottom-0 h-px bg-gb-line-dark transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span ref={progressRef} className="gb-progress block h-full w-full bg-gb-gold" />
        </span>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
