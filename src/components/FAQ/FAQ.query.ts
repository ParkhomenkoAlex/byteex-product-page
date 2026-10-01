export const FAQ_QUERY = `*[_type == "faqSection"][0]{
  heading,
  items[]{_key, question, answer},
  images[]{_key, alt, asset->{url}}
}`
