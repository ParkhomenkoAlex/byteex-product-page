import { useEffect, useRef, useState } from 'react'
import styles from './CompanyLogoSlider.module.css'
import type { CompanyLogo } from './TopBenefits.types'

type CompanyLogoSliderProps = {
  label?: string
  logos: CompanyLogo[]
}

function CompanyLogoSlider({ label, logos }: CompanyLogoSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    startX: number
    scrollLeft: number
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [activePage, setActivePage] = useState(0)
  const visibleLogos = logos.filter((logo) => logo.image?.asset?.url)

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const updatePagination = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth
      const nextPageCount =
        maxScroll > 0
          ? Math.ceil(viewport.scrollWidth / viewport.clientWidth)
          : 1

      setPageCount(nextPageCount)
      setActivePage(
        maxScroll > 0
          ? Math.round((viewport.scrollLeft / maxScroll) * (nextPageCount - 1))
          : 0,
      )
    }

    const resizeObserver = new ResizeObserver(updatePagination)

    updatePagination()
    viewport.addEventListener('scroll', updatePagination, { passive: true })
    resizeObserver.observe(viewport)

    return () => {
      viewport.removeEventListener('scroll', updatePagination)
      resizeObserver.disconnect()
    }
  }, [visibleLogos.length])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const viewport = viewportRef.current
      const drag = dragRef.current

      if (!viewport || !drag) {
        return
      }

      viewport.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX)
    }

    const finishDrag = () => {
      dragRef.current = null
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', finishDrag)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', finishDrag)
    }
  }, [])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current

    if (!viewport || event.button !== 0) {
      return
    }

    event.preventDefault()
    dragRef.current = {
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    }
    setIsDragging(true)
  }

  if (!visibleLogos.length) {
    return null
  }

  return (
    <div className={styles.slider}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        ref={viewportRef}
        className={
          isDragging ? `${styles.viewport} ${styles.dragging}` : styles.viewport
        }
        onMouseDown={handleMouseDown}
        onDragStart={(event) => event.preventDefault()}
      >
        <ul className={styles.track} aria-label="Company logos">
          {visibleLogos.map((logo) => (
            <li key={logo._key} className={styles.logo}>
              <img src={logo.image?.asset?.url} alt={logo.image?.alt || ''} />
            </li>
          ))}
        </ul>
      </div>
      {pageCount > 1 && (
        <div className={styles.pagination} aria-hidden="true">
          {Array.from({ length: pageCount }, (_, index) => (
            <span
              key={index}
              className={
                index === activePage
                  ? `${styles.bullet} ${styles.bulletActive}`
                  : styles.bullet
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CompanyLogoSlider
