import { cn } from '@/utilities'

function Loader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('', className)}>
      <div
        role="status"
        aria-label="Loading"
        className="text-primary animate-loader before:animate-loader after:animate-loader relative mx-auto box-border block h-4 w-2 rounded bg-current before:absolute before:top-1/2 before:-left-5 before:box-border before:h-4 before:w-2 before:-translate-y-1/2 before:rounded before:bg-current before:content-[''] before:[animation-delay:0s] after:absolute after:top-1/2 after:left-5 after:box-border after:h-4 after:w-2 after:-translate-y-1/2 after:rounded after:bg-current after:content-[''] after:[animation-delay:0.45s]"
      />
    </div>
  )
}

export { Loader }
