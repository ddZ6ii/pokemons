import { CircleXIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useFilters, useFiltersActions } from '@/store'
import { cn, debounce } from '@/utilities'
import { useQuery } from '@tanstack/react-query'
import { createPokemonsQueryOptions } from '@/api'

export default function Search({
  className,
  id = 'search',
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  const [name, setName] = useState('')
  const { page, perPage, search } = useFilters()
  const { setSearch } = useFiltersActions()
  const [isPending, startTransition] = useTransition()
  const { data: results } = useQuery({
    ...createPokemonsQueryOptions({ page, perPage, search }),
    select: (data) => data.items,
    enabled: !!search, // only fetch total items when there's a search term
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce(
        (nextSearch: string) => {
          startTransition(() => {
            setSearch(nextSearch.trim())
          })
        },
        { delay: 300 },
      ),
    [setSearch, startTransition],
  )
  const showResults =
    search !== undefined && search.length > 0 && results !== undefined

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const nextValue = e.target.value
    setName(nextValue)
    debouncedSetSearch(nextValue)
  }
  const handleSearchClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    debouncedSetSearch.cancel()
    setSearch('')
  }

  return (
    <>
      <Label htmlFor={id} className="sr-only">
        Search pokemon
      </Label>

      <div className="relative w-xs">
        <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:ring-primary/80">
          <InputGroupAddon>
            <SearchIcon aria-hidden={true} />
          </InputGroupAddon>

          <InputGroupInput
            id={id}
            type="search"
            placeholder="Search..."
            value={name}
            onChange={handleSearchChange}
            className={cn(
              '[type=search]]:appearance-none [&::-webkit-search-cancel-button]:appearance-none',
              className,
            )}
            {...props}
          />

          {showResults && (
            <InputGroupAddon align="inline-end">
              {results} results
            </InputGroupAddon>
          )}

          {name && name.length > 0 && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="secondary"
                aria-controls={id}
                aria-label={isPending ? 'Loading' : 'Clear search'}
                aria-haspopup="false"
                disabled={isPending}
                loading={isPending}
                onClick={handleSearchClear}
              >
                {!isPending && <CircleXIcon aria-hidden={true} />}
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
    </>
  )
}
