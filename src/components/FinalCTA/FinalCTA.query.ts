export const FINAL_CTA_QUERY = `*[_type == "finalCta"][0]{
  title,
  text,
  ctaText,
  ctaLink,
  slides[]{_key, image{asset->{url}}, alt},
  shippingIcon{alt, asset->{url}},
  shippingText,
  paymentMethods[]{_key, alt, asset->{url}},
  bottomItems[]{_key, icon{alt, asset->{url}}, text}
}`
