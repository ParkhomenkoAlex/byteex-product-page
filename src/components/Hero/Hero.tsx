import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import Benefits from '../Benefits/Benefits'
import CTAButton from '../CTAButton/CTAButton'
import { HERO_QUERY } from './Hero.query'
import HorizontalSlider from '../HorizontalSlider/HorizontalSlider'
import type { HeroContent } from './Hero.types'
import styles from './Hero.module.css'

function Hero() {
  const [hero, setHero] = useState<HeroContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<HeroContent | null>(HERO_QUERY)
      .then(setHero)
      .catch((error) => {
        console.error('Failed to load hero:', error)
      })
  }, [])

  if (!hero) {
    return null
  }

  const hasSlides = (hero.slides ?? []).some((slide) => slide.image?.asset?.url)

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroShell}>
        {hero.brandLogo?.asset?.url && (
          <img
            className={styles.heroBrand}
            src={hero.brandLogo.asset.url}
            alt={hero.brandLogo.alt || ''}
          />
        )}

        <div
          className={
            hasSlides
              ? `${styles.heroGrid} ${styles.heroGridWithSlider}`
              : styles.heroGrid
          }
        >
          <div className={styles.heroCopy}>
            <h1>{hero.heading}</h1>

            <HorizontalSlider
              className={styles.heroSlider}
              slides={hero.slides ?? []}
            />

            <Benefits items={hero.benefits ?? []} />

            <CTAButton
              className={styles.heroCta}
              text={hero.ctaText}
              href={hero.ctaLink}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
