const getNewKey = (key) => {
  const regex = /_es$/
  const isSpanish = key.match(regex)
  return isSpanish ? key.replace(regex, '') : key
}

const processVal = (val) =>
  typeof val !== 'object' || val === null
    ? val
    : Array.isArray(val)
    ? val.map(renameKeys)
    : renameKeys(val)

const renameKeys = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [getNewKey(key), processVal(val)])
  )

export default async function parseQuery(data = {}) {
  return renameKeys(data)
}
