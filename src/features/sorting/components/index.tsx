import { SortingDesktop } from '@/features/sorting/components/sorting-desktop'
import { SortingMobile } from '@/features/sorting/components/sorting-mobile'
import { useIsMobile } from '@/shared/hooks'

type SortingProps = {
  className?: string
}

export function Sorting({ className }: SortingProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <SortingMobile className={className} />
  }
  return <SortingDesktop className={className} />
}
