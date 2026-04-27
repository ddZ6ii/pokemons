import { Logo, Pokemons, SelectMode } from '@/components'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSystemModeSync } from '@/hooks'

export default function App() {
  useSystemModeSync()

  return (
    <TooltipProvider>
      <div className="container mx-auto flex min-h-screen flex-col gap-8 p-3">
        <header className="flex items-center justify-between gap-4">
          <Logo />
          <SelectMode />
        </header>

        <main className="flex flex-1">
          <Pokemons />
        </main>
      </div>
    </TooltipProvider>
  )
}
