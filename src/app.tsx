import { Header } from '@/components'
import { Heading } from '@/components/ui/heading'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSystemModeSync } from '@/hooks'

export default function App() {
  // Ensures the app reacts to system theme changes when mode is 'system'
  useSystemModeSync()

  return (
    <TooltipProvider>
      <div className="container mx-auto flex min-h-screen flex-col gap-8 p-3">
        <Header />

        <main className="flex-1">
          <Heading as="h1" className="text-center">
            Pokemons
          </Heading>
        </main>
      </div>
    </TooltipProvider>
  )
}
