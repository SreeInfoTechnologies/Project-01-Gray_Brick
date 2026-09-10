import { partners } from '@/data/partners'
import { cn } from '@/lib/cn'

/**
 * Partner logos, each on a light tile.
 *
 * The tile is what lets every mark keep its real colours: Amazon's wordmark is
 * near-black and would vanish on this site's dark ground, and recolouring a
 * partner's logo to suit our palette is not ours to do.
 *
 * A static row rather than a scrolling carousel. Four names fit on one line,
 * and nothing slides past before it can be read.
 */
export function PartnerLogos({ compact = false, className }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4', className)}>
      {partners.map((partner) => (
        <li
          key={partner.name}
          className={cn(
            'flex items-center justify-center rounded-gb-sm bg-gb-white px-5',
            compact ? 'h-20' : 'h-24 sm:h-28',
          )}
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              className={cn('w-auto max-w-full object-contain', partner.logoClass)}
            />
          ) : (
            <span className="text-2xl font-extrabold tracking-tight text-gb-black sm:text-[1.75rem]">
              {partner.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
