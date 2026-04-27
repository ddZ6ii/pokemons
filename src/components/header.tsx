import {
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'motion/react'
import { useState } from 'react'

import { Logo, SelectMode } from '@/components'
import { useSystemModeSync } from '@/hooks'
import { cn } from '@/utilities'

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: '-200%',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const scrollThreshold = 0.0025

export default function Header({
  className,
  ...props
}: React.ComponentProps<typeof motion.header>) {
  const [hidden, setHidden] = useState(false)
  const { scrollYProgress } = useScroll()

  useSystemModeSync()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = scrollYProgress.getPrevious()
    if (!previous) return
    const isScrollingDown = latest > previous
    const shouldBeHidden = isScrollingDown && latest >= scrollThreshold
    setHidden(shouldBeHidden)
  })

  return (
    <motion.header
      className={cn(
        'sticky top-4 z-10 flex items-center justify-between gap-4 rounded-lg px-4 py-2 backdrop-blur-sm',
        className,
      )}
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{
        duration: 0.35,
        ease: 'easeInOut',
      }}
      {...props}
    >
      <Logo />
      <SelectMode />
    </motion.header>
  )
}
