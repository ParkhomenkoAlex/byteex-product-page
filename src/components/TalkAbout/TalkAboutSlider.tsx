import { useState } from 'react'
import styles from './TalkAboutSlider.module.css'
import type { TalkAboutImage } from './TalkAbout.types'

type TalkAboutSliderProps = { images: TalkAboutImage[] }

type ImagePosition = 'active' | 'next' | 'previous' | 'hidden'

function TalkAboutSlider({ images }: TalkAboutSliderProps) {
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
            aria-label={`Show image ${index + 1}`}
            aria-current={isActive ? 'true' : undefined}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
          >
            <img src={image.asset?.url} alt="" />
          </button>
        )
      })}
    </div>
  )
}

export default TalkAboutSlider
