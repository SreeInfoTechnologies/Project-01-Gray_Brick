const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Send an enquiry to the configured endpoint.
 *
 * Until VITE_ENQUIRY_ENDPOINT is set the submission is NOT delivered anywhere.
 * The form still completes so the experience can be reviewed, but a loud
 * console warning is emitted. See .env.example and the README.
 */
export async function submitEnquiry(payload) {
  const body = { ...payload, submittedAt: new Date().toISOString() }

  if (!ENDPOINT) {
    console.warn(
      '[Gray Brick] VITE_ENQUIRY_ENDPOINT is not configured. The enquiry below was NOT delivered:',
      body,
    )
    await wait(650)
    return { delivered: false }
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Enquiry endpoint responded with ${response.status}`)
  }

  return { delivered: true }
}
