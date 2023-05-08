
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
const download = require('download-git-repo');

function deleteFolder(filePath: string) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file: string[]) => {
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const paths = './eth-eips/';
  console.log('delete cache');
  deleteFolder(paths);

  download(
    'direct:https://github.com/ethereum/EIPs.git',
    'etp-eips',
    { clone: true },
    (err: Error | undefined) => {
      console.log(err ? 'clone error' : 'clone success');
    }
  );

  res.status(200).end('Hello Cron!');
}
