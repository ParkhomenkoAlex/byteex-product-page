import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import CTAButton from '../CTAButton/CTAButton'
import { HOW_TO_ORDER_QUERY } from './HowToOrder.query'
import HowToSlider from './HowToSlider'
import type { HowToOrderContent } from './HowToOrder.types'
import styles from './HowToOrder.module.css'

function HowToOrder() {
  const [content, setContent] = useState<HowToOrderContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<HowToOrderContent | null>(HOW_TO_ORDER_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load How to Order section:', error)
      })
  }, [])

  if (!content) return null

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        {content.heading && (
          <h2 className={styles.heading}>{content.heading}</h2>
        )}
        <HowToSlider cards={content.cards ?? []} />
        {content.ctaText && (
          <CTAButton
            className={styles.cta}
            text={content.ctaText}
            href={content.ctaLink}
          />
        )}
      </div>
    </section>
  )
}

export default HowToOrder
