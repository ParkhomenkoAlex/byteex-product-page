export type FAQItem = {
  _key: string
  question?: string
  answer?: string
}

export type FAQImage = {
  _key: string
  alt?: string
  asset?: {
    url?: string
  }
}

export type FAQContent = {
  heading?: string
  items: FAQItem[]
  images: FAQImage[]
}
