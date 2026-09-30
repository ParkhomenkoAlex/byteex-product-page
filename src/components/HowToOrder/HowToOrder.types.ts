export type HowToOrderCard = {
  _key: string
  icon?: {
    alt?: string
    asset?: {
      url?: string
    }
  }
  title?: string
  text?: string
}

export type HowToOrderContent = {
  heading?: string
  cards: HowToOrderCard[]
  ctaText?: string
  ctaLink?: string
}
