// short id
export const shortID = () => {
  const random = Math.random().toString(16)
  const now = (+new Date()).toString(16)
  return `${random.slice(random.length - 7)}-${now.slice(now.length - 7)}`
}
