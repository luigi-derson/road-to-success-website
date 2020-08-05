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

export const orderAlphabetically = (list) =>
  list.sort((a, b) => a.name.localeCompare(b.name))

export const orderByInteger = (list) =>
  list[0].order
    ? list.sort((a, b) => a.order - b.order)
    : list.sort((a, b) => a.name.localeCompare(b.name))
