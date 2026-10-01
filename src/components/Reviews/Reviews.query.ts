export const REVIEWS_QUERY = `*[_type == "reviewsSection"][0]{
  heading,
  description,
  reviews[]{
    _key,
    avatar{alt, asset->{url}},
    name,
    rating,
    text
  }
}`
