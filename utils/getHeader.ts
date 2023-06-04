export const createLink = (string: string): string => {
  const shapedString = string.toLowerCase().replace(/^#+\s/, '').trimEnd()
  const anchor = shapedString.split(' ').join('-').replace(/[!?\s]/g, "-")
  return anchor
}

export function getHeader(mdText: string): string[] {
  const headingRegex = new RegExp(
    `^#{1,2}\\s.+(\\n|\\r|\\r\\n)`,
    'gm',
  )
  let result = mdText.match(headingRegex)
  let menuArr: string[] = [];
  if (result?.length) {
    result.forEach(item => {
      menuArr.push(item.replace(/^#+\s/, '').trimEnd())
    })
  }

  return menuArr;
}