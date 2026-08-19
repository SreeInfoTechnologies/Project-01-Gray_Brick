import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon } from '@/components/common/Icon'
import { useHoverCapable } from '@/hooks/useHoverCapable'
import { cn } from '@/lib/cn'

// Hover intent. Opening on the very first pixel makes the bar feel twitchy when
// the pointer only crosses a label on its way somewhere else, and closing the
// instant the pointer leaves makes the panel impossible to reach diagonally.
const OPEN_DELAY = 90
const CLOSE_DELAY = 220

/**
 * One primary navigation item that owns a submenu.
 *
 * The parent stays a real link and the submenu gets its own toggle beside it.
 * Making the label do both jobs is the usual shortcut and it breaks touch:
 * there is no hover, so the first tap has to open the menu, which means the
 * parent page can only ever be reached by a second tap somewhere else. Here the
 * label always navigates and the chevron always toggles, on every input.
 *
 * This is a disclosure, not a `role="menu"` widget. Menu roles promise arrow-key
 * navigation and a focus model that belongs to application menus; a list of
 * links should stay a list of links, so Tab moves through them as usual.
 *
 * Open state lives in the Navbar so only one panel can be open at a time and so
 * a route change closes it in one place.
 */
export function NavDropdown({ item, open, onOpen, onClose, isActive }) {
  const hoverCapable = useHoverCapable()
  const wrapRef = useRef(null)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const openTimer = useRef(null)
  const closeTimer = useRef(null)
  const panelId = `gb-nav-${item.label.toLowerCase().replace(/[^a-z]+/g, '-')}`

  const clearTimers = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
  }

  useEffect(() => clearTimers, [])

  // Dismissal, both handled at the document so they work wherever focus or the
  // pointer happens to be. Pointerdown rather than click so the panel is gone
  // before the click lands on whatever was underneath it.
  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) onClose()
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      onClose()
      // Focus goes back to the control that opened the panel, so Escape does
      // not drop the keyboard user at the top of the document.
      if (wrapRef.current?.contains(document.activeElement)) toggleRef.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  // Panels are centred on their trigger, which puts the widest one off-screen
  // for the items sitting furthest right on a narrow laptop. Rather than pick a
  // single alignment that is wrong somewhere, measure once on open and nudge it
  // back inside.
  //
  // Written as a custom property through a ref, the same way useScrollProgress
  // and useParallax do it, so no element ever carries an inline style.
  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return undefined

    const clamp = () => {
      // Reset first so the measurement is of the unshifted position.
      panel.style.setProperty('--gb-shift', '0px')
      const rect = panel.getBoundingClientRect()
      const margin = 16
      let shift = 0
      if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right
      else if (rect.left < margin) shift = margin - rect.left
      panel.style.setProperty('--gb-shift', `${Math.round(shift)}px`)
    }

    clamp()
    window.addEventListener('resize', clamp)
    return () => window.removeEventListener('resize', clamp)
  }, [open])

  const hoverProps = hoverCapable
    ? {
        onMouseEnter: () => {
          clearTimers()
          openTimer.current = setTimeout(onOpen, OPEN_DELAY)
        },
        onMouseLeave: () => {
          clearTimers()
          closeTimer.current = setTimeout(onClose, CLOSE_DELAY)
        },
      }
    : null

  return (
    // Hover and focus-out sit on a plain wrapper rather than on the <li>: a
    // list item carries a semantic role, and hanging interaction off it is what
    // jsx-a11y/no-noninteractive-element-interactions exists to catch. The real
    // controls are the link and the toggle inside.
    <li>
      <div
        ref={wrapRef}
        className="relative"
        {...hoverProps}
        // Tabbing out of the group closes it. relatedTarget is the element
        // about to receive focus, so this fires once, on the way out.
        onBlur={(event) => {
          if (open && !wrapRef.current?.contains(event.relatedTarget)) onClose()
        }}
      >
        <div className="flex items-center gap-1">
        <NavLink
          to={item.to}
          className={cn(
            'relative inline-block py-2 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-200',
            isActive ? 'text-gb-silver-light' : 'text-gb-silver hover:text-gb-silver-light',
          )}
        >
          <span data-active={isActive} className="gb-underline">
            {item.label}
          </span>
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? onClose() : onOpen())}
          className={cn(
            'flex h-6 w-5 items-center justify-center rounded-gb-xs transition-colors duration-200',
            open ? 'text-gb-gold' : 'text-gb-silver-dark hover:text-gb-gold',
          )}
        >
          <Icon
            name="chevronDown"
            className={cn(
              'h-3 w-3 transition-transform duration-300 ease-[var(--ease-gb)]',
              open && 'rotate-180',
            )}
          />
          <span className="sr-only">{open ? 'Hide' : 'Show'} {item.label} menu</span>
        </button>
      </div>

      <div ref={panelRef} id={panelId} data-open={open} className="gb-dropdown">
        <div
          className={cn(
            'gb-card rounded-gb-sm p-2 shadow-gb-panel',
            // Clamped to the viewport as well as sized, so a narrow laptop at
            // the lg breakpoint can never push a panel off-screen.
            item.menu.groups.length > 1
              ? 'w-[47rem] max-w-[calc(100vw-2rem)]'
              : 'w-[21rem] max-w-[calc(100vw-2rem)]',
          )}
        >
          {/* Gold rule across the top edge, echoing the lines in the mark. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gb-gold/70" />

          <div
            className={cn(
              'grid gap-1',
              // The corridor group carries two sub-columns, so it gets twice
              // the width of the single-column facility-type group.
              item.menu.groups.length > 1 && 'sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]',
            )}
          >
            {item.menu.groups.map((group) => (
              <div key={group.title} className="min-w-0 p-1">
                <p className="px-3 pt-2 pb-1.5 text-eyebrow text-gb-silver-dark uppercase">
                  {group.title}
                </p>
                <ul className={cn('flex flex-col', group.columns === 2 && 'sm:grid sm:grid-cols-2')}>
                  {group.links.map((link) => (
                    <li key={link.to} className="min-w-0">
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        className="group/link flex flex-col gap-0.5 rounded-gb-xs px-3 py-2 transition-colors duration-200 hover:bg-gb-slate"
                      >
                        <span className="truncate text-[0.8125rem] font-medium text-gb-silver-light transition-colors duration-200 group-hover/link:text-gb-gold">
                          {link.label}
                        </span>
                        {link.hint ? (
                          // Wraps rather than truncates: the longest corridor
                          // label does not fit on one line at any panel width,
                          // and a hidden half-word is worse than a taller row.
                          <span className="text-[0.6875rem] leading-tight tracking-[0.06em] text-gb-silver-dark uppercase">
                            {link.hint}
                          </span>
                        ) : null}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.menu.footer ? (
            <NavLink
              to={item.menu.footer.to}
              onClick={onClose}
              className="gb-arrow-host mt-1 flex items-center justify-between gap-3 border-t border-gb-line px-4 py-3 text-[0.8125rem] font-semibold text-gb-silver-light transition-colors duration-200 hover:text-gb-gold"
            >
              <span>{item.menu.footer.label}</span>
              <Icon name="arrowRight" className="gb-arrow h-4 w-4" />
            </NavLink>
          ) : null}
        </div>
        </div>
      </div>
    </li>
  )
}
