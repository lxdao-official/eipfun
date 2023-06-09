export const createLink = (string: string): string => {
  const shapedString = string.toLowerCase().replace(/^#+\s/, '').trimEnd()
  const anchor = shapedString.split(' ').join('-').replace(/[!?\s]/g, "-")
  return anchor
}

export function getHeader(mdText: string): string[] {
  const codeBlockRegex = new RegExp(
    '((````[a-z]*\n[\\s\\S]*?\n````)|(```[a-z]*=\n[\\s\\S]*?\n```)|(~~~[a-z]*\n[\\s\\S]*?\n~~~))',
    'gms',
  )
  mdText = mdText.replace(codeBlockRegex, '');
  const headingRegex = new RegExp(
    `^#{1,2}\\s.+(\\n|\\r|\\r\\n)`,
    'gm',
  );
  const headingRegex3 = new RegExp(
    `^###\\s.+(\\n|\\r|\\r\\n)`,
    'gm',
  );
  let result = mdText.match(headingRegex)
  let menuArr: string[] = [];
  if (result?.length) {
    result.forEach(item => {
      menuArr.push(item.replace(/^#+\s/, '').trimEnd());
    });
  } else {
    result = mdText.match(headingRegex3);
    result?.forEach(item => {
      menuArr.push(item.replace(/^#+\s/, '').trimEnd())
    })
  }

  return menuArr;
}