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

export default function handler(req, res) {
  const paths = './ETH-EIPs/';
  console.log('delete cache');
  deleteFolder(paths);

  download(
    'direct:https://github.com/ethereum/EIPs.git',
    'ETH-EIPs',
    { clone: true },
    (err) => {
      console.log(err ? 'clone error' : 'clone success');
    }
  );

  res.status(200).end('Hello Cron!');
}
