import { CogIcon, MoonIcon, SunIcon, type LucideIcon } from 'lucide-react'

import { WithTooltip } from '@/components'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MODES, type Mode } from '@/schemas'
import { useMode, useModeActions } from '@/store'
import { capitalize, cn } from '@/utilities'

const iconsMap: Record<Mode, LucideIcon> = {
  dark: MoonIcon,
  light: SunIcon,
  system: CogIcon,
}

export default function SelectMode({
  className,
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  const mode = useMode()
  const { setMode } = useModeActions()

  const Icon = iconsMap[mode]
  const label = `Select mode (${mode})`

  return (
    <Select
      value={mode}
      onValueChange={(value) => {
        setMode(value as Mode)
      }}
    >
      <WithTooltip message={label}>
        <SelectTrigger
          {...props}
          className={cn(
            'aspect-square h-9! justify-center px-2 md:px-3 [&>svg:last-of-type]:hidden md:[&>svg:last-of-type]:block',
            className,
          )}
          aria-label={label}
        >
          <SelectValue>
            <Icon aria-hidden="true" />
            <span className="hidden md:block">{capitalize(mode)}</span>
          </SelectValue>
        </SelectTrigger>
      </WithTooltip>
      <SelectContent position="popper" align="end">
        <SelectGroup>
          <SelectLabel>Mode</SelectLabel>
          {MODES.map((mode) => (
            <SelectItem key={mode} value={mode}>
              {capitalize(mode)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
