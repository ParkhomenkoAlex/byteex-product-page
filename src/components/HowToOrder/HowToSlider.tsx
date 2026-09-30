import { useEffect, useRef, useState } from 'react'
import styles from './HowToSlider.module.css'
import type { HowToOrderCard } from './HowToOrder.types'

type HowToSliderProps = {
  cards: HowToOrderCard[]
}

function HowToSlider({ cards }: HowToSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; scrollLeft: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 759px)')
    const updateMode = () => setIsMobile(mediaQuery.matches)

    updateMode()
    mediaQuery.addEventListener('change', updateMode)

    return () => mediaQuery.removeEventListener('change', updateMode)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const viewport = viewportRef.current
      const drag = dragRef.current

      if (!viewport || !drag) return

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

    if (!viewport || isMobile || event.button !== 0) return

    event.preventDefault()
    dragRef.current = { startX: event.clientX, scrollLeft: viewport.scrollLeft }
    setIsDragging(true)
  }

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? cards.length - 1 : index - 1))
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % cards.length)
  }

  if (!cards.length) return null

  return (
    <div className={styles.slider}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrevious}`}
        onClick={showPrevious}
        disabled={cards.length < 2}
        aria-label="Previous step"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m14 5-7 7 7 7" />
        </svg>
      </button>
      <div
        ref={viewportRef}
        className={
          isDragging ? `${styles.viewport} ${styles.dragging}` : styles.viewport
        }
        onMouseDown={handleMouseDown}
        onDragStart={(event) => event.preventDefault()}
      >
        <ul
          className={styles.track}
          style={{ '--active-card': activeIndex } as React.CSSProperties}
          aria-label="How to order steps"
        >
          {cards.map((card) => (
            <li className={styles.card} key={card._key}>
              {card.icon?.asset?.url && (
                <img
                  className={styles.icon}
                  src={card.icon.asset.url}
                  alt={card.icon.alt || ''}
                />
              )}
              {card.title && <h3 className={styles.title}>{card.title}</h3>}
              {card.text && <p className={styles.text}>{card.text}</p>}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={showNext}
        disabled={cards.length < 2}
        aria-label="Next step"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m10 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default HowToSlider
