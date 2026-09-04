import type { ChangeEventHandler } from "react"
import { useState, useCallback } from "react"

function useQuery(initState = "") {
  const [query, setQuery] = useState(initState)

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setQuery(target.value)
    },
    []
  )

  return {
    query,
    onChange,
  } as const
}

export default useQuery
