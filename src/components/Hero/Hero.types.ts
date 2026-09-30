import type { Benefit } from '../Benefits/Benefits.types'

export type HeroSlide = {
  _key: string
  alt?: string
  image?: {
    asset?: {
      url?: string
    }
  }
}

export type HeroContent = {
  brandLogo?: {
    alt?: string
    asset?: {
      url?: string
    }
  }
  heading: string
  benefits: Benefit[]
  ctaText: string
  ctaLink?: string
  slides: HeroSlide[]
}
