const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Indian and international formats, allowing spaces, dashes and a leading +.
const PHONE = /^\+?[\d\s-]{8,16}$/

export const required = (label) => (value) =>
  value && value.trim() ? null : `${label} is required.`

const validators = {
  name: (value) => {
    if (!value || !value.trim()) return 'Please tell us your name.'
    if (value.trim().length < 2) return 'Please enter your full name.'
    return null
  },
  company: () => null,
  email: (value) => {
    if (!value || !value.trim()) return 'We need an email address to reply to.'
    if (!EMAIL.test(value.trim())) return 'That email address does not look quite right.'
    return null
  },
  phone: (value) => {
    if (!value || !value.trim()) return null
    if (!PHONE.test(value.trim())) return 'Please enter a number we can reach you on, or leave it blank.'
    return null
  },
  requirement: () => null,
  location: () => null,
  space: () => null,
  message: (value) => {
    if (!value || !value.trim()) return 'A couple of lines about the requirement helps us reply usefully.'
    if (value.trim().length < 12) return 'A little more detail, please. Even rough numbers help.'
    return null
  },
}

/** Validate a whole form object; returns a map of field -> message. */
export function validateForm(values, fields) {
  const errors = {}
  fields.forEach((field) => {
    const validate = validators[field]
    if (!validate) return
    const message = validate(values[field])
    if (message) errors[field] = message
  })
  return errors
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
