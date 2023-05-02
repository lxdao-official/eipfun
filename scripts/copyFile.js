const fs = require('fs');
const path = require('path');

const baseUrl = './ETH-EIPs/EIPS/';

function copyFiles() {
  fs.readdir(baseUrl, function (err, files) {
    if (err) console.log(err);
    files.forEach((item) => {
      let name = item.replace('.md', '');
      fs.copyFile(
        path.join('./pages/eips/eip0.mdx'),
        path.join('./pages/eips/', name + '.mdx'),
        function (err, data) {
          if (err) console.log(err);
          data && console.log(data);
        }
      );
    });

    console.log('copy end');
  });
}

function editFiles() {
  fs.readdir('./pages/eips/', function (err, data) {
    if (err) console.log(err);
    data.forEach((file) => {
      if (file && file.includes('eip-')) {
        let eipNum = file.replace('eip-', '').replace('.mdx', '');
        fs.readFile(path.join('./pages/eips/', file), function (err, data) {
          if (err) console.log(err);
          fs.writeFile(
            path.join('./pages/eips/', file),
            data
              .toString()
              .replace('eip-1.md', `eip-${eipNum}.md`)
              .replace('eip969', `eip${eipNum}`),
            function (err, data) {
              if (err) console.log(err);
              data && console.log(data);
            }
          );
        });
      }
    });
  });
}

copyFiles();
editFiles();
