import { useEffect, useRef, useState } from 'react'
import styles from './ReviewsSlider.module.css'
import type { Review } from './Reviews.types'

type ReviewsSliderProps = {
  reviews: Review[]
}

function ReviewsSlider({ reviews }: ReviewsSliderProps) {
  const previewsRef = useRef<HTMLDivElement>(null)
  const previewRefs = useRef<Array<HTMLButtonElement | null>>([])
  const dragRef = useRef<{ startX: number; scrollLeft: number; moved: boolean } | null>(
    null,
  )
  const didDragRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [visibleCards, setVisibleCards] = useState(1)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1000px)')
    const tabletQuery = window.matchMedia('(min-width: 600px)')
    const updateVisibleCards = () => {
      setVisibleCards(desktopQuery.matches ? 3 : tabletQuery.matches ? 2 : 1)
    }

    updateVisibleCards()
    desktopQuery.addEventListener('change', updateVisibleCards)
    tabletQuery.addEventListener('change', updateVisibleCards)

    return () => {
      desktopQuery.removeEventListener('change', updateVisibleCards)
      tabletQuery.removeEventListener('change', updateVisibleCards)
    }
  }, [])

  useEffect(() => {
    previewRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeIndex])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const viewport = previewsRef.current
      const drag = dragRef.current

      if (!viewport || !drag) return

      const distance = event.clientX - drag.startX
      if (Math.abs(distance) > 4) drag.moved = true
      viewport.scrollLeft = drag.scrollLeft - distance
    }

    const finishDrag = () => {
      if (dragRef.current?.moved) didDragRef.current = true
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

  const selectReview = (index: number) => {
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    setActiveIndex(index)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = previewsRef.current

    if (!viewport || event.button !== 0) return

    event.preventDefault()
    dragRef.current = {
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
      moved: false,
    }
    setIsDragging(true)
  }

  const showPrevious = () => setActiveIndex((index) => Math.max(0, index - 1))
  const showNext = () =>
    setActiveIndex((index) => Math.min(reviews.length - 1, index + 1))

  if (!reviews.length) return null

  const trackIndex = Math.min(
    Math.max(0, activeIndex - Math.floor(visibleCards / 2)),
    Math.max(0, reviews.length - visibleCards),
  )

  return (
    <div className={styles.slider}>
      <div
        ref={previewsRef}
        className={isDragging ? `${styles.previews} ${styles.dragging}` : styles.previews}
        onMouseDown={handleMouseDown}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className={styles.previewTrack} aria-label="Review previews">
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review._key}
              ref={(element) => {
                previewRefs.current[index] = element
              }}
              className={
                index === activeIndex
                  ? `${styles.preview} ${styles.previewActive}`
                  : styles.preview
              }
              onClick={() => selectReview(index)}
              aria-label={`Show review from ${review.name || `customer ${index + 1}`}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              {review.avatar?.asset?.url && (
                <img src={review.avatar.asset.url} alt={review.avatar.alt || ''} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cardsArea}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrevious}`}
          onClick={showPrevious}
          disabled={activeIndex === 0}
          aria-label="Previous review"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14 5-7 7 7 7" />
          </svg>
        </button>
        <div className={styles.cardsViewport}>
          <div
            className={styles.cardsTrack}
            style={{ '--track-index': trackIndex } as React.CSSProperties}
          >
            {reviews.map((review, index) => {
              const rating = Math.max(0, Math.min(5, Math.round(review.rating ?? 0)))

              return (
                <article className={styles.cardWrap} key={review._key}>
                  <div
                    className={
                      index === activeIndex
                        ? `${styles.card} ${styles.cardActive}`
                        : styles.card
                    }
                  >
                    <div className={styles.author}>
                      {review.avatar?.asset?.url && (
                        <img
                          className={styles.avatar}
                          src={review.avatar.asset.url}
                          alt={review.avatar.alt || ''}
                        />
                      )}
                      <div>
                        <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <span
                              className={starIndex < rating ? styles.starFilled : styles.star}
                              key={starIndex}
                              aria-hidden="true"
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {review.name && <h3 className={styles.name}>{review.name}</h3>}
                      </div>
                    </div>
                    {review.text && <p className={styles.text}>{review.text}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={showNext}
          disabled={activeIndex === reviews.length - 1}
          aria-label="Next review"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m10 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ReviewsSlider
