const fs = require('fs');
const path = require('path');

let resArr = '';
const baseUrl = './ETH-EIPs/EIPS/';
let fileNum = 0;
let i = 0;

function getMetaData(file) {
  fs.readFile(path.join(baseUrl, file), function (err, data) {
    if (err) console.log(err);
    let metas = data.toString().split('---')[1];
    let res = {};

    metas.split('\n').forEach((item) => {
      if (item && item.includes(':')) {
        let [k, v] = item.split(': ');
        if (['eip', 'requires'].includes(k)) {
          v = ~~v;
        }
        res[k] = v;
      }
    });
    i += 1;
    resArr += `export const ${file.replace(
      /(-|\.|m|d)/g,
      ''
    )} = ${JSON.stringify(res)}; \n`;

    if (i === fileNum) {
      fs.writeFileSync('./data/eips.js', resArr);
    }
  });
}

fs.readdir(baseUrl, function (err, files) {
  if (err) console.log(err);
  fileNum = files.length;
  console.log(fileNum, '文件数');

  files.forEach((file) => {
    getMetaData(file);
  });
});
