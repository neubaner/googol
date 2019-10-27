import { useState, useEffect } from 'react'

const useDebounce = <T>(value: T, wait: number) => {
  const [debouncedValue, setDebouncedValue] = useState(() => value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), wait)

    return () => clearTimeout(timeoutId)
  }, [value, wait])

  return debouncedValue
}

export default useDebounce
