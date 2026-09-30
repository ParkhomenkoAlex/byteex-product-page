import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import type { HeaderContent } from './Header.types'
import { HEADER_QUERY } from './Header.query'
import styles from './Header.module.css'

function Header() {
  const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<HeaderContent | null>(HEADER_QUERY)
      .then(setHeaderContent)
      .catch((error) => {
        console.error('Failed to load header:', error)
      })
  }, [])

  return (
    <header className={styles.header}>
      {headerContent && (
        <>
          <p className={styles.desktopText}>{headerContent.desktopText}</p>
          <p className={styles.mobileText}>{headerContent.mobileText}</p>
        </>
      )}
    </header>
  )
}

export default Header
