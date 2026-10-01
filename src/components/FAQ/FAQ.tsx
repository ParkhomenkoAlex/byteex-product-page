import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'
import { FAQ_QUERY } from './FAQ.query'
import FAQSlider from './FAQSlider'
import type { FAQContent } from './FAQ.types'
import styles from './FAQ.module.css'

function FAQ() {
  const [content, setContent] = useState<FAQContent | null>(null)
  const [activeItemKey, setActiveItemKey] = useState<string | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<FAQContent | null>(FAQ_QUERY)
      .then(setContent)
      .catch((error) => {
        console.error('Failed to load FAQ section:', error)
      })
  }, [])

  if (!content) return null

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.faq}>
            {content.heading && (
              <h2 className={styles.heading}>{content.heading}</h2>
            )}
            {!!content.items?.length && (
              <div className={styles.items}>
                {content.items.map((item) => {
                  const isOpen = activeItemKey === item._key
                  const answerId = `faq-answer-${item._key}`

                  return (
                    <article className={styles.item} key={item._key}>
                      <button
                        type="button"
                        className={styles.question}
                        onClick={() =>
                          setActiveItemKey(isOpen ? null : item._key)
                        }
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                      >
                        <span>{item.question}</span>
                        <span className={styles.symbol} aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <div
                        id={answerId}
                        className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                      >
                        <div className={styles.answerInner}>{item.answer}</div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
          <FAQSlider images={content.images ?? []} />
        </div>
      </div>
    </section>
  )
}

export default FAQ
