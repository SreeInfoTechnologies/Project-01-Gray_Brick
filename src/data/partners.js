import amazonLogo from '@/assets/partners/amazon.svg'
import blinkitLogo from '@/assets/partners/blinkit.svg'
import swiggyLogo from '@/assets/partners/swiggy.webp'

// ---------------------------------------------------------------------------
// Partners, as confirmed by Gray Brick.
//
// Logos are the companies' published marks, taken unmodified from Wikimedia
// Commons (Swiggy_Logo_2024.webp, Blinkit-yellow-rounded.svg, Amazon_logo.svg).
// They are shown on a light tile so each keeps its own brand colours instead of
// being recoloured into this site's palette.
//
// Bistro has no published mark on Commons, so it is set as a wordmark until
// Gray Brick supplies the logo file. Adding `logo` to its entry is the only
// change needed.
//
// `logoClass` sizes each mark optically: a square app icon and a wide wordmark
// at the same pixel height do not read as the same size.
// ---------------------------------------------------------------------------

export const partners = [
  { name: 'Swiggy', logo: swiggyLogo, logoClass: 'h-9 sm:h-10' },
  { name: 'Blinkit', logo: blinkitLogo, logoClass: 'h-12 sm:h-14' },
  { name: 'Bistro', logo: null, logoClass: '' },
  { name: 'Amazon', logo: amazonLogo, logoClass: 'h-7 translate-y-1 sm:h-8' },
]
