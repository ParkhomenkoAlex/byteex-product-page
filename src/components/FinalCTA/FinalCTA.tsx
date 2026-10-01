import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import CTAButton from '../CTAButton/CTAButton'
import HorizontalSlider from '../HorizontalSlider/HorizontalSlider'
import { FINAL_CTA_QUERY } from './FinalCTA.query'
import type { FinalCTAContent } from './FinalCTA.types'
import styles from './FinalCTA.module.css'

function FinalCTA() {
  const [content, setContent] = useState<FinalCTAContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<FinalCTAContent | null>(FINAL_CTA_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load Final CTA:', error)
      })
  }, [])

  if (!content) return null

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        {content.title && <h2 className={styles.title}>{content.title}</h2>}
        {content.text && <p className={styles.text}>{content.text}</p>}
        <HorizontalSlider
          className={styles.slider}
          slides={content.slides ?? []}
        />
        {content.ctaText && (
          <CTAButton
            className={styles.cta}
            text={content.ctaText}
            href={content.ctaLink}
          />
        )}
      </div>
      <div className={styles.footerDetails}>
        <div className={styles.footerShell}>
          <div className={styles.footerTopRow}>
            <div className={styles.shipping}>
              {content.shippingIcon?.asset?.url && (
                <img
                  className={styles.shippingIcon}
                  src={content.shippingIcon.asset.url}
                  alt={content.shippingIcon.alt || ''}
                />
              )}
              {content.shippingText && <span>{content.shippingText}</span>}
            </div>
            {!!content.paymentMethods?.length && (
              <>
                <span className={styles.footerDivider} aria-hidden="true" />
                <ul
                  className={styles.paymentMethods}
                  aria-label="Payment methods"
                >
                  {content.paymentMethods.map((method) => (
                    <li className={styles.paymentMethod} key={method._key}>
                      {method.asset?.url && (
                        <img src={method.asset.url} alt={method.alt || ''} />
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {!!content.bottomItems?.length && (
            <ul className={styles.bottomRow}>
              {content.bottomItems.map((item) => (
                <li className={styles.bottomItem} key={item._key}>
                  {item.icon?.asset?.url && (
                    <img
                      className={styles.bottomIcon}
                      src={item.icon.asset.url}
                      alt={item.icon.alt || ''}
                    />
                  )}
                  {item.text && <span>{item.text}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
