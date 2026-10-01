export const REVIEWS_QUERY = `*[_type == "reviewsSection"][0]{
  heading,
  description,
  ctaText,
  ctaLink,
  reviews[]{
    _key,
    avatar{alt, asset->{url}},
    name,
    rating,
    text
  }
}`
