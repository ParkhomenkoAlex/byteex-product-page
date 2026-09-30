import { useState } from 'react'
import styles from './TalkAboutSlider.module.css'
import type { TalkAboutImage } from './TalkAbout.types'

type TalkAboutSliderProps = { images: TalkAboutImage[] }

function TalkAboutSlider({ images }: TalkAboutSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const availableImages = images.filter((image) => image.asset?.url)

  if (!availableImages.length) return null

  const previousIndex =
    (activeIndex - 1 + availableImages.length) % availableImages.length
  const nextIndex = (activeIndex + 1) % availableImages.length
  const activeImage = availableImages[activeIndex]

  return (
    <div className={styles.slider} aria-roledescription="carousel">
      {availableImages.length > 1 && (
        <button
          type="button"
          className={`${styles.preview} ${styles.previewPrevious}`}
          onClick={() => setActiveIndex(previousIndex)}
          aria-label="Show previous image"
        >
          <img src={availableImages[previousIndex].asset?.url} alt="" />
        </button>
      )}
      <div className={styles.activeFrame}>
        <img
          key={activeImage._key}
          className={styles.activeImage}
          src={activeImage.asset?.url}
          alt=""
        />
      </div>
      {availableImages.length > 1 && (
        <button
          type="button"
          className={`${styles.preview} ${styles.previewNext}`}
          onClick={() => setActiveIndex(nextIndex)}
          aria-label="Show next image"
        >
          <img src={availableImages[nextIndex].asset?.url} alt="" />
        </button>
      )}
    </div>
  )
}

export default TalkAboutSlider
