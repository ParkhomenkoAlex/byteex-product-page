import styles from './Benefits.module.css'
import type { Benefit } from './Benefits.types'

type BenefitsProps = {
  items: Benefit[]
  className?: string
  alignIconsToTop?: boolean
  stackOnMobile?: boolean
  topBenefitsStyle?: boolean
}

function Benefits({
  items,
  className,
  alignIconsToTop = false,
  stackOnMobile = false,
  topBenefitsStyle = false,
}: BenefitsProps) {
  return (
    <ul
      className={`${styles.list}${className ? ` ${className}` : ''}${
        alignIconsToTop ? ` ${styles.alignIconsToTop}` : ''
      }${stackOnMobile ? ` ${styles.stackOnMobile}` : ''}${
        topBenefitsStyle ? ` ${styles.topBenefitsStyle}` : ''
      }`}
    >
      {items.map((item) => (
        <li key={item._key} className={styles.item}>
          {item.icon?.asset?.url && (
            <span className={styles.icon}>
              <img src={item.icon.asset.url} alt={item.icon.alt || ''} />
            </span>
          )}
          <span className={styles.content}>
            {item.title && <span className={styles.title}>{item.title}</span>}
            <span className={styles.text}>{item.text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Benefits
