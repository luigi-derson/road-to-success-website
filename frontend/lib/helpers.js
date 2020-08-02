export const parseUrl = (url) =>
  `${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`

export const solveDimension = (calc) => {
  if (calc > -30 && calc < 30) {
    return 1
  } else if (calc > 30) {
    return 4
  } else {
    return 3
  }
}
