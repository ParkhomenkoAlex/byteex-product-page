export type InfoBannerItem = {
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

export type InfoBannerContent = {
  heading?: string
  items: InfoBannerItem[]
}
