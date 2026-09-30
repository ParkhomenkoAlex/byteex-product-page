export const TOP_BENEFITS_QUERY = `*[_type == "topBenefits"][0]{
  asSeenInText,
  heading,
  companyLogos[]{
    _key,
    image{alt, asset->{url}}
  },
  benefits[]{
    _key,
    icon{alt, asset->{url}},
    title,
    text
  },
  slides[]{
    _key,
    title,
    image{alt, asset->{url}}
  }
}`
