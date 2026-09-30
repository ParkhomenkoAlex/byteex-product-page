import type { Benefit } from '../Benefits/Benefits.types'

export type CompanyLogo = {
  _key: string
  image?: {
    alt?: string
    asset?: {
      url?: string
    }
  }
}

export type TopBenefitsSlide = {
  _key: string
  title: string
  image?: {
    alt?: string
    asset?: {
      url?: string
    }
  }
}

export type TopBenefitsContent = {
  asSeenInText?: string
  heading?: string
  companyLogos: CompanyLogo[]
  benefits: Benefit[]
  slides: TopBenefitsSlide[]
}
