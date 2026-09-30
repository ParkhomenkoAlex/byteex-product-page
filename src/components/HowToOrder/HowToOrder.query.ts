export const HOW_TO_ORDER_QUERY = `*[_type == "howToOrderSection"][0]{
  heading,
  cards[]{
    _key,
    icon{alt, asset->{url}},
    title,
    text
  },
  ctaText,
  ctaLink
}`
