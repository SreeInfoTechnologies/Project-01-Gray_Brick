/** Join conditional class names. Keeps JSX readable without a dependency. */
export const cn = (...parts) => parts.filter(Boolean).join(' ')
