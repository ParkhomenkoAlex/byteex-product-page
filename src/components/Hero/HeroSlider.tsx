import { useState } from 'react'
import styles from './HeroSlider.module.css'
import type { HeroSlide } from './Hero.types'

type HeroSliderProps = {
  slides: HeroSlide[]
}

type SlidePosition = 'farPrevious' | 'previous' | 'active' | 'next' | 'farNext'

function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const availableSlides = slides.filter((slide) => slide.image?.asset?.url)

  if (!availableSlides.length) {
    return null
  }

  const getPosition = (index: number): SlidePosition => {
    if (index === activeIndex) {
      return 'active'
    }

    if (availableSlides.length === 2) {
      return 'previous'
    }

    const distance =
      (index - activeIndex + availableSlides.length) % availableSlides.length

    if (distance === 1) {
      return 'next'
    }

    if (distance === availableSlides.length - 1) {
      return 'previous'
    }

    return distance < availableSlides.length / 2 ? 'farNext' : 'farPrevious'
  }

  const renderSlide = (index: number) => {
    const slide = availableSlides[index]

    if (!slide) {
      return null
    }

    const position = getPosition(index)
    const isActive = position === 'active'
    const isVisible =
      position === 'active' || position === 'previous' || position === 'next'

    return (
      <button
        type="button"
        key={slide._key}
        onClick={() => setActiveIndex(index)}
        aria-label={slide.alt}
        aria-current={isActive ? 'true' : undefined}
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        className={`${styles.slide} ${
          position === 'active'
            ? styles.slideActive
            : position === 'previous'
              ? styles.slidePrevious
              : position === 'next'
                ? styles.slideNext
                : position === 'farPrevious'
                  ? styles.slideFarPrevious
                  : styles.slideFarNext
        }`}
      >
        <img src={slide.image?.asset?.url} alt={slide.alt || ''} />
      </button>
    )
  }

  return (
    <div className={styles.slider} aria-roledescription="carousel">
      <span
        className={`${styles.backgroundCard} ${styles.backgroundPrevious}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.backgroundCard} ${styles.backgroundNext}`}
        aria-hidden="true"
      />
      {availableSlides.map((_, index) => renderSlide(index))}
    </div>
  )
}

export default HeroSlider
