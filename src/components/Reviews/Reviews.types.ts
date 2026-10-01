export type Review = {
  _key: string
  avatar?: {
    alt?: string
    asset?: {
      url?: string
    }
  }
  name?: string
  rating?: number
  text?: string
}

export type ReviewsContent = {
  heading?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  reviews: Review[]
}
