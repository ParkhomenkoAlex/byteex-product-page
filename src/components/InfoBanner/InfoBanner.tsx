import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import { INFO_BANNER_QUERY } from './InfoBanner.query'
import type { InfoBannerContent } from './InfoBanner.types'
import styles from './InfoBanner.module.css'

function InfoBanner() {
  const [content, setContent] = useState<InfoBannerContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<InfoBannerContent | null>(INFO_BANNER_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load Info Banner:', error)
      })
  }, [])

  if (!content) return null

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        {content.heading && (
          <h2 className={styles.heading}>{content.heading}</h2>
        )}
        {!!content.items?.length && (
          <ul className={styles.items}>
            {content.items.map((item) => (
              <li className={styles.item} key={item._key}>
                {item.icon?.asset?.url && (
                  <img
                    className={styles.icon}
                    src={item.icon.asset.url}
                    alt={item.icon.alt || ''}
                  />
                )}
                {item.title && <h3 className={styles.title}>{item.title}</h3>}
                {item.text && <p className={styles.text}>{item.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default InfoBanner
