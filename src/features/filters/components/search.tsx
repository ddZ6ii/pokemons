import { useQuery } from '@tanstack/react-query'
import { CircleXIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'

import { createPokemonsQueryOptions } from '@/features/pokemons/api'
import type { PokemonsPaginatedResponse } from '@/features/pokemons/schemas'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/ui/input-group'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'
import { useFilters, useFiltersActions } from '@/shared/store'
import { debounce } from '@/shared/utilities'

const selectItems = (data: PokemonsPaginatedResponse) => data.items

type SearchProps = React.ComponentProps<typeof InputGroupInput> & {
  wrapperClassName?: string
}

export function Search({
  className,
  id = 'search',
  wrapperClassName,
  ...props
}: SearchProps) {
  const [name, setName] = useState('')
  const { search, ...filters } = useFilters()
  const { setSearch } = useFiltersActions()
  const [isPending, startTransition] = useTransition()
  const { data: results } = useQuery({
    ...createPokemonsQueryOptions({ search, ...filters }),
    select: selectItems,
    enabled: !!search,
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce(
        (nextSearch: string) => {
          startTransition(() => {
            setSearch(nextSearch.trim())
          })
        },
        { delay: 350 },
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

      <div className={cn('relative', wrapperClassName)}>
        <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:ring-primary/80 lg:h-9">
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
