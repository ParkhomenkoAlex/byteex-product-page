export const INFO_BANNER_QUERY = `*[_type == "infoBanner"][0]{
  heading,
  items[]{
    _key,
    icon{alt, asset->{url}},
    title,
    text
  }
}`
