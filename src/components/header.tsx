import { SelectMode } from '@/components'
import { useSystemModeSync } from '@/hooks'

export default function Header({}: React.ComponentProps<'header'>) {
  // Ensures the app reacts to system theme changes when mode is 'system'
  useSystemModeSync()

  return (
    <header className="flex items-center justify-between gap-4">
      <img
        src="/pokeball.png"
        alt=""
        width={767}
        height={767}
        className="size-9"
      />
      <SelectMode />
    </header>
  )
}
