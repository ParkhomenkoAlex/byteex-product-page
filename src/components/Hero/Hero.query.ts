export const HERO_QUERY = `*[_type == "heroSection"][0]{
    brandLogo{alt, asset->{url}},
    heading,
    benefits[]{
        _key,
        icon{alt, asset->{url}},
        title,
        text
    },
    ctaText,
    ctaLink,
    slides[]{
        _key,
        alt,
        image{asset->{url}}
    }
}`
