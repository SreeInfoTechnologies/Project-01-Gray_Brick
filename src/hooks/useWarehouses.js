import { useEffect, useMemo, useState } from 'react'

import { warehouses as inventory } from '@/data/warehouses'

// The one place the rest of the app reads facility data from. Swapping the
// static import below for `fetch('/api/warehouses')` is the entire migration
// path. Every consumer already handles loading, error and empty results.
const LATENCY_MS = 420
let cache = null

function loadWarehouses() {
  if (cache) return Promise.resolve(cache)
  return new Promise((resolve) => {
    setTimeout(() => {
      cache = inventory
      resolve(cache)
    }, LATENCY_MS)
  })
}

export function useWarehouses() {
  const [state, setState] = useState(() =>
    cache ? { status: 'ready', data: cache, error: null } : { status: 'loading', data: [], error: null },
  )

  useEffect(() => {
    if (state.status === 'ready') return undefined

    // Status is already 'loading' whenever this effect runs, either from the
    // initial state or from retry(), so there is nothing to set here.
    let active = true

    loadWarehouses()
      .then((data) => {
        if (active) setState({ status: 'ready', data, error: null })
      })
      .catch((error) => {
        if (active) setState({ status: 'error', data: [], error })
      })

    return () => {
      active = false
    }
    // Re-runs only when a retry resets the status away from "ready".
  }, [state.status])

  const retry = () => setState({ status: 'loading', data: [], error: null })

  return { ...state, retry }
}

/** Apply the location / type / availability filters to a facility list. */
function filterWarehouses(list, filters) {
  return list.filter((item) => {
    if (filters.location && item.location !== filters.location) return false
    if (filters.type && item.type !== filters.type) return false
    if (filters.availability && item.availability !== filters.availability) return false
    return true
  })
}

export function useFilteredWarehouses(filters) {
  const { status, data, error, retry } = useWarehouses()
  const results = useMemo(() => filterWarehouses(data, filters), [data, filters])
  return { status, error, retry, results, total: data.length }
}
