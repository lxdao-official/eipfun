export type EIPHeader = {
  [key: string]: string | Project[];
};

export function formatMeta(meta: string): EIPHeader {
  const metaObj: EIPHeader = {};

  meta.split('\n').forEach((item) => {
    if (item && item.includes(': ')) {
      let tmpItem = item.replace(': ', '----');
      const [k, v] = tmpItem.split('----');
      metaObj[k] = v.replaceAll('"', '');
    }
  });

  return metaObj;
}

type Project = {
  title: string;
  link: string;
  imgSrc: string;
  alt: string;
};

export function formatComEIP(str: string): EIPHeader {
  let meta, con;
  const metaObj: EIPHeader = {};
  if (str.includes('---')) {
    [, meta, ...con] = str.split('---');
  } else {
    con = str;
  }
  if (meta) {
    Object.assign(metaObj, formatMeta(meta));
  }

  con
    .toString()
    .trim()
    .split('## ')
    .forEach((item) => {
      if (!item) {
        return;
      }

      let [k, ...v] = item.split('\n\n');
      k = k.trim().toLowerCase();
      let vStr = '';
      if (k === 'chatgpt4') {
        vStr = v.join('<br /><br />').trim();
      } else {
        v.toString().trim();
      }

      if (vStr.includes('- ')) {
        let tmpArr: Project[] = [];
        vStr.split('- ').forEach((line: string | undefined) => {
          if (line) {
            const imgRegex = /!\[(.+?)\]\((.+?)\)/;
            const linkRegex = /\[(.+?)\]\((.+?)\)/;
            const imgMatch = line.match(imgRegex);
            const linkMath = line.match(linkRegex);

            tmpArr.push({
              title: linkMath ? linkMath[1] : '',
              link: linkMath ? linkMath[2] : '',
              imgSrc: imgMatch ? imgMatch[2] : '',
              alt: imgMatch ? imgMatch[1] : '',
            });
          }
        });
        metaObj[k] = tmpArr;
      } else {
        metaObj[k] = vStr;
      }
    });

  return metaObj;
}
