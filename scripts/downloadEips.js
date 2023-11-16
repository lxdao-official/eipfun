const fs = require('fs');
const download = require('download-git-repo');

function deleteFolder(filePath) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`;
      const states = fs.statSync(nextFilePath);
      if (states.isDirectory()) {
        //recurse
        deleteFolder(nextFilePath);
      } else {
        //delete file
        fs.unlinkSync(nextFilePath);
      }
    });
    fs.rmdirSync(filePath);
  }
}

const eipPaths = './eth-eips/';
const ercPaths = './eth-ercs/';

~(async function () {
  deleteFolder(eipPaths);
  deleteFolder(ercPaths);
  download(
    'direct:https://github.com/ethereum/ERCs.git',
    'eth-ercs',
    { clone: true },
    (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('clone success');
    }
  );
  download(
    'direct:https://github.com/ethereum/EIPs.git',
    'eth-eips',
    { clone: true },
    (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('clone success');
    }
  );
})();
