/**
 * Returns an ordered list of page numbers to render in a pagination control.
 * `NaN` represents an ellipsis gap between non-contiguous page groups.
 *
 * @param current - The currently active page (1-based).
 * @param maxVisible - Maximum number of page slots to display (including ellipses and edge pages).
 * @param total - Total number of pages.
 * @returns Array of page numbers with `NaN` where ellipses should appear.
 */
export function getPages(current: number, maxVisible: number, total: number) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const centerHalf = Math.floor((maxVisible - 4) / 2)
  const showLeftEllipsis = current - centerHalf > 2
  const showRightEllipsis = current + centerHalf < total - 1
  const zoneCount = maxVisible - 3

  if (!showLeftEllipsis) {
    return [
      ...Array.from({ length: zoneCount }, (_, i) => i + 1),
      NaN,
      total - 1,
      total,
    ]
  }
  if (!showRightEllipsis) {
    return [
      1,
      2,
      NaN,
      ...Array.from({ length: zoneCount }, (_, i) => total - zoneCount + i + 1),
    ]
  }

  const centerPages = Array.from(
    { length: maxVisible - 4 },
    (_, i) => current - centerHalf + i,
  )
  return [1, NaN, ...centerPages, NaN, total]
}
