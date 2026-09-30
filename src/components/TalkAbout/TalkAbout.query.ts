export const TALK_ABOUT_QUERY = `*[_type == "talkAboutSection"][0]{
  heading, personName, paragraphs, ctaText, ctaLink, images[]{_key, asset->{url}}
}`
