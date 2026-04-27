import { Header, Pokemons } from '@/components'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  return (
    <TooltipProvider>
      <div className="relative container mx-auto flex min-h-screen flex-col gap-8 p-3">
        <Header />

        <main className="flex-1">
          <Pokemons />
        </main>
      </div>
    </TooltipProvider>
  )
}
