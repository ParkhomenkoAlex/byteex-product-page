export type TalkAboutImage = { _key: string; asset?: { url?: string } }

export type TalkAboutContent = {
  heading?: string
  personName?: string
  paragraphs: string[]
  ctaText?: string
  ctaLink?: string
  images: TalkAboutImage[]
}
