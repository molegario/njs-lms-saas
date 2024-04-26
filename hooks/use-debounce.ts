import {useEffect, useState} from "react"

export function useDebounce<T>(value: T, delay?: number):T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    ()=>{
      const timer = setTimeout(
        ()=>setDebouncedValue(value),
        delay || 500
      )
      return () => {
        clearTimeout(timer)
      };
    },
    [value, delay]
  )
  return debouncedValue;
}

// OLEGARIO TIMESTAMP: 2022-02-01T00:00:00Z 7.25.42 https://youtu.be/Big_aFLmekI?t=26742
// Path: hooks/use-debounce.ts