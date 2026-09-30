import type { HorizontalSliderSlide } from '../HorizontalSlider/HorizontalSlider'

type FinalCTAImage = {
  alt?: string
  asset?: {
    url?: string
  }
}

type FinalCTAPaymentMethod = {
  _key: string
  alt?: string
  asset?: {
    url?: string
  }
}

type FinalCTABottomItem = {
  _key: string
  icon?: FinalCTAImage
  text?: string
}

export type FinalCTAContent = {
  title?: string
  text?: string
  ctaText?: string
  ctaLink?: string
  slides: HorizontalSliderSlide[]
  shippingIcon?: FinalCTAImage
  shippingText?: string
  paymentMethods: FinalCTAPaymentMethod[]
  bottomItems: FinalCTABottomItem[]
}
