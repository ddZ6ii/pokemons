import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

/**
 * Tracks whether an element should be hidden based on scroll direction and position.
 *
 * @param threshold - Scroll progress value (0–1) at which hiding activates.
 * @param hideDirection - Hide when scrolling `'down'` (past threshold) or `'up'` (before threshold).
 * @param initiallyHidden - Whether the element starts hidden before any scroll event.
 * @returns `true` when the element should be hidden, `false` otherwise.
 */
export default function useScrollVisibility(
  threshold: number,
  hideDirection: 'up' | 'down',
  initiallyHidden = false,
) {
  const [hidden, setHidden] = useState(initiallyHidden)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = scrollYProgress.getPrevious()
    if (!previous) return
    const nextHidden =
      hideDirection === 'down'
        ? latest > previous && latest >= threshold
        : latest < previous && latest <= threshold
    setHidden(nextHidden)
  })

  return hidden
}
