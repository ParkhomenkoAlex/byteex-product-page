import { useState } from 'react'
import styles from './HorizontalSlider.module.css'

export type HorizontalSliderSlide = {
  _key: string
  image?: {
    asset?: {
      url?: string
    }
  }
  alt?: string
}

type HorizontalSliderProps = {
  slides: HorizontalSliderSlide[]
  className?: string
}

type SlidePosition = 'farPrevious' | 'previous' | 'active' | 'next' | 'farNext'

function HorizontalSlider({ slides, className }: HorizontalSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const availableSlides = slides.filter((slide) => slide.image?.asset?.url)

  if (!availableSlides.length) return null

  const getPosition = (index: number): SlidePosition => {
    if (index === activeIndex) return 'active'
    if (availableSlides.length === 2) return 'previous'

    const distance =
      (index - activeIndex + availableSlides.length) % availableSlides.length

    if (distance === 1) return 'next'
    if (distance === availableSlides.length - 1) return 'previous'

    return distance < availableSlides.length / 2 ? 'farNext' : 'farPrevious'
  }

  return (
    <div
      className={className ? `${styles.slider} ${className}` : styles.slider}
      aria-roledescription="carousel"
    >
      <span
        className={`${styles.backgroundCard} ${styles.backgroundPrevious}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.backgroundCard} ${styles.backgroundNext}`}
        aria-hidden="true"
      />
      {availableSlides.map((slide, index) => {
        const position = getPosition(index)
        const isActive = position === 'active'
        const isVisible =
          position === 'active' ||
          position === 'previous' ||
          position === 'next'
        const positionClass = isActive
          ? styles.slideActive
          : position === 'previous'
            ? styles.slidePrevious
            : position === 'next'
              ? styles.slideNext
              : position === 'farPrevious'
                ? styles.slideFarPrevious
                : styles.slideFarNext

        return (
          <button
            type="button"
            key={slide._key}
            onClick={() => setActiveIndex(index)}
            aria-label={slide.alt || `Show image ${index + 1}`}
            aria-current={isActive ? 'true' : undefined}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            className={`${styles.slide} ${positionClass}`}
          >
            <img src={slide.image?.asset?.url} alt={slide.alt || ''} />
          </button>
        )
      })}
    </div>
  )
}

export default HorizontalSlider
