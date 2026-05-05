import { Pokedex } from '@/features/pokemons/components'
import { Header } from '@/shared/components'
import { TooltipProvider } from '@/shared/components/ui/tooltip'

export function App() {
  return (
    <TooltipProvider>
      <div className="relative container mx-auto flex min-h-screen flex-col p-3">
        <Header />

        <main className="flex-1">
          <Pokedex />
        </main>
      </div>
    </TooltipProvider>
  )
}
