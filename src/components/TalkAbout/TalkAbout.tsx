import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import CTAButton from '../CTAButton/CTAButton'
import { TALK_ABOUT_QUERY } from './TalkAbout.query'
import TalkAboutSlider from './TalkAboutSlider'
import type { TalkAboutContent } from './TalkAbout.types'
import styles from './TalkAbout.module.css'

function TalkAbout() {
  const [content, setContent] = useState<TalkAboutContent | null>(null)
  useEffect(() => {
    sanityClient
      .fetch<TalkAboutContent | null>(TALK_ABOUT_QUERY)
      .then(setContent)
      .catch((error) =>
        console.error('Failed to load Talk About section:', error),
      )
  }, [])
  if (!content) return null
  const insertName = (text: string) =>
    text.replaceAll('{{name}}', content.personName ?? '')

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.layout}>
          <TalkAboutSlider images={content.images ?? []} />
          <div className={styles.copy}>
            {content.heading && (
              <h2 className={styles.heading}>{content.heading}</h2>
            )}
            {!!content.paragraphs?.length && (
              <div className={styles.paragraphs}>
                {content.paragraphs.map((paragraph, index) => (
                  <p className={styles.paragraph} key={`${index}-${paragraph}`}>
                    {insertName(paragraph)}
                  </p>
                ))}
              </div>
            )}
            {content.ctaText && (
              <CTAButton
                className={styles.cta}
                text={content.ctaText}
                href={content.ctaLink}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalkAbout
