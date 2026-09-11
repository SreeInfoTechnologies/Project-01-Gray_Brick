import { addressSingleLine, company } from './company'
import { partners } from './partners'
import { solutions } from './solutions'
import { availabilityOptions, coverageAreas, labelFor, locationFor, locations, warehouses } from './warehouses'

// ---------------------------------------------------------------------------
// Questions about Gray Brick itself, answered on the homepage and published as
// FAQPage structured data.
//
// These are the questions people put to a search engine or an AI assistant
// about a company: what it does, where it is, who runs it, who it works with.
// Each answer is a complete, self-contained statement that still makes sense
// when quoted on its own, away from this page.
//
// Every fact is assembled from the data files the rest of the site renders
// from, so an answer can never disagree with the page it sits on. A question
// whose facts are missing (no facility available to move into, say) drops out
// rather than being answered with something stale.
// ---------------------------------------------------------------------------

const list = (items) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`

const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1)

const { founder } = company
const qualification = founder.facts.find((fact) => fact.label === 'Qualification')?.value

const readyNow = warehouses.find((w) => w.type === 'ready-to-move' && w.availability === 'available')
const readyNowLocation = readyNow ? locationFor(readyNow.location) : null

export const companyFaqs = [
  {
    question: `What does ${company.name} do?`,
    answer: `${company.legalName} is a warehousing company based in Bengaluru (Bangalore), Karnataka. It offers ${list(
      solutions.map((s) => s.title.toLowerCase()),
    )} to businesses that need storage, fulfilment or distribution space in and around the city.`,
  },
  {
    question: `Where are ${company.shortName}'s warehouses in Bengaluru?`,
    answer: `${company.shortName} runs ${locations.length} facilities of its own in north-east Bengaluru: ${list(
      locations.map((l) => `${l.label} (${l.address})`),
    )}. Beyond those, the team sources warehouse space across ${list(
      coverageAreas.map((a) => a.label),
    )}.`,
  },
  {
    question: `Who is the founder of ${company.name}?`,
    answer: `${company.name} was founded by ${founder.name}${
      qualification ? ` (${qualification})` : ''
    }, its ${founder.title}. ${founder.intro}`,
  },
  {
    question: `Which companies work with ${company.shortName}?`,
    answer: `${list(partners.map((p) => p.name))} are among ${company.shortName}'s partners.`,
  },
  readyNow && readyNowLocation
    ? {
        question: `Can I rent a ready-to-move warehouse in Bengaluru through ${company.shortName}?`,
        answer: `Yes. ${company.shortName}'s ${readyNowLocation.label} facility is ready-to-move and currently ${labelFor(
          availabilityOptions,
          readyNow.availability,
        ).toLowerCase()}: ${lowerFirst(readyNow.summary)} It is at ${readyNowLocation.address}. For operations that need a particular layout, clear height or dock arrangement, built-to-suit space is also available.`,
      }
    : null,
  {
    question: `How do I enquire about warehouse space with ${company.shortName}?`,
    answer: `Send the requirement through the enquiry form on the ${company.name} website: preferred location, the space needed and how it will be used. The office is at ${addressSingleLine}, open ${company.workingHours}.`,
  },
].filter(Boolean)
