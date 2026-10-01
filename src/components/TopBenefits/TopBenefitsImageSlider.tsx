import { useState } from 'react'
import styles from './TopBenefitsImageSlider.module.css'
import type { TopBenefitsSlide } from './TopBenefits.types'

type TopBenefitsImageSliderProps = {
  slides: TopBenefitsSlide[]
}

function TopBenefitsImageSlider({ slides }: TopBenefitsImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const availableSlides = slides.filter((slide) => slide.image?.asset?.url)

  if (!availableSlides.length) {
    return null
  }

  const activeSlide = availableSlides[activeIndex]
  const hasMultipleSlides = availableSlides.length > 1

  const setPreviousSlide = () => {
    setActiveIndex((index) =>
      index === 0 ? availableSlides.length - 1 : index - 1,
    )
  }

  const setNextSlide = () => {
    setActiveIndex((index) => (index + 1) % availableSlides.length)
  }

  return (
    <div className={styles.slider} aria-roledescription="carousel">
      <div className={styles.imageArea}>
        <div className={styles.imageFrame}>
          <img
            key={activeSlide._key}
            className={styles.image}
            src={activeSlide.image?.asset?.url}
            alt={activeSlide.image?.alt || activeSlide.title}
          />
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous image"
            onClick={setPreviousSlide}
            disabled={!hasMultipleSlides}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next image"
            onClick={setNextSlide}
            disabled={!hasMultipleSlides}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className={styles.thumbnails}>
          {availableSlides.map((slide, index) => (
            <button
              key={slide._key}
              type="button"
              className={
                index === activeIndex
                  ? `${styles.thumbnail} ${styles.thumbnailActive}`
                  : styles.thumbnail
              }
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-label={`Show image ${index + 1}`}
            >
              <span className={styles.thumbnailImage}>
                <img src={slide.image?.asset?.url} alt="" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <span className={styles.slideTitle}>{activeSlide.title}</span>
    </div>
  )
}

export default TopBenefitsImageSlider
