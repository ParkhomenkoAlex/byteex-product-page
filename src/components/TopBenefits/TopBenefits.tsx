import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import Benefits from '../Benefits/Benefits'
import CompanyLogoSlider from './CompanyLogoSlider'
import TopBenefitsImageSlider from './TopBenefitsImageSlider'
import { TOP_BENEFITS_QUERY } from './TopBenefits.query'
import type { TopBenefitsContent } from './TopBenefits.types'
import styles from './TopBenefits.module.css'

function TopBenefits() {
  const [content, setContent] = useState<TopBenefitsContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<TopBenefitsContent | null>(TOP_BENEFITS_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load top benefits:', error)
      })
  }, [])

  if (!content) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.logoBand}>
        <div className={styles.shell}>
          <CompanyLogoSlider
            label={content.asSeenInText}
            logos={content.companyLogos ?? []}
          />
        </div>
      </div>

      <div className={`${styles.shell} ${styles.content}`}>
        {content.heading && (
          <h2 className={styles.heading}>{content.heading}</h2>
        )}
        <div className={styles.imageSlider}>
          <TopBenefitsImageSlider slides={content.slides ?? []} />
        </div>
        <Benefits
          alignIconsToTop
          className={styles.benefits}
          items={content.benefits ?? []}
          stackOnMobile
          topBenefitsStyle
        />
      </div>
    </section>
  )
}

export default TopBenefits
