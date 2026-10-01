import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import CTAButton from '../CTAButton/CTAButton'
import { REVIEWS_QUERY } from './Reviews.query'
import ReviewsSlider from './ReviewsSlider'
import type { ReviewsContent } from './Reviews.types'
import styles from './Reviews.module.css'

function Reviews() {
  const [content, setContent] = useState<ReviewsContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<ReviewsContent | null>(REVIEWS_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load Reviews section:', error)
      })
  }, [])

  if (!content) return null

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        {content.heading && (
          <h2 className={styles.heading}>{content.heading}</h2>
        )}
        {content.description && (
          <p className={styles.description}>{content.description}</p>
        )}
        <ReviewsSlider reviews={content.reviews ?? []} />
        {content.ctaText && content.ctaLink && (
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

export default Reviews
