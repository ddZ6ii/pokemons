import { FilterControls } from '@/features/filters/components/filter-controls'
import { FilterMobileDrawer } from '@/features/filters/components/filter-mobile-drawer'
import { useIsMobile } from '@/shared/hooks'

export function Filtering({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <FilterMobileDrawer />
      ) : (
        <FilterControls className={className} {...props} />
      )}
    </>
  )
}
