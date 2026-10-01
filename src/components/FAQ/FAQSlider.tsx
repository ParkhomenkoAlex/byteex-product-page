import { useState } from 'react'
import styles from './FAQSlider.module.css'
import type { FAQImage } from './FAQ.types'

type FAQSliderProps = {
  images: FAQImage[]
}

type ImagePosition = 'active' | 'next' | 'previous' | 'hidden'

function FAQSlider({ images }: FAQSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const availableImages = images.filter((image) => image.asset?.url)

  if (!availableImages.length) return null

  const getPosition = (index: number): ImagePosition => {
    if (index === activeIndex) return 'active'
    if (
      (index - activeIndex + availableImages.length) %
        availableImages.length ===
      1
    ) {
      return 'next'
    }
    if (
      (activeIndex - index + availableImages.length) %
        availableImages.length ===
      1
    ) {
      return 'previous'
    }
    return 'hidden'
  }

  return (
    <div className={styles.slider} aria-roledescription="carousel">
      <span
        className={`${styles.background} ${styles.backgroundTop}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.background} ${styles.backgroundBottom}`}
        aria-hidden="true"
      />
      {availableImages.map((image, index) => {
        const position = getPosition(index)
        const isActive = position === 'active'
        const isVisible = position !== 'hidden'

        return (
          <button
            type="button"
            key={image._key}
            className={`${styles.image} ${styles[position]}`}
            onClick={() => setActiveIndex(index)}
            aria-label={image.alt || `Show image ${index + 1}`}
            aria-current={isActive ? 'true' : undefined}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
          >
            <img src={image.asset?.url} alt={image.alt || ''} />
          </button>
        )
      })}
    </div>
  )
}

export default FAQSlider
