import { Icon } from '@/components/common/Icon'
import { ImageFrame } from '@/components/common/ImageFrame'

/**
 * One sector, with the operational requirements that typically shape its
 * warehousing. Anchored by id so the footer and homepage can link straight to
 * a specific sector.
 */
export function IndustryCard({ industry }) {
  return (
    <article
      id={industry.id}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-gb-sm gb-card transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-gb)] hover:-translate-y-1.5 hover:border-gb-gold/50 hover:shadow-gb-lift"
    >
      <ImageFrame
        src={industry.image}
        alt={industry.imageAlt}
        ratio="16/9"
        zoom
        className="border-b border-gb-line"
      />

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-gb-line text-gb-gold transition-[border-color,transform] duration-500 ease-[var(--ease-gb)] group-hover:-translate-y-0.5 group-hover:border-gb-gold/60">
            <Icon name={industry.icon} className="h-5 w-5" />
          </span>
          <h2 className="text-display-sm text-gb-silver-light">{industry.title}</h2>
        </div>

        <p className="text-[0.9375rem] leading-relaxed text-gb-silver">{industry.description}</p>

        <div className="mt-auto border-t border-gb-line pt-5">
          <h3 className="text-eyebrow uppercase text-gb-silver-dark">What it usually needs</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {industry.needs.map((need) => (
              <li
                key={need}
                className="border border-gb-line bg-gb-charcoal px-2.5 py-1.5 text-[0.75rem] text-gb-silver"
              >
                {need}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
