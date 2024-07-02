const { exec } = require('child_process');

// new branch name
const newBranchName = `update-${new Date()
  .toLocaleDateString()
  .replaceAll('/', '-')}`;

const createBranchCommand = `git checkout -b ${newBranchName}`;

exec(createBranchCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`exec error output: ${stderr}`);
    return;
  }
  console.log(`new branch created: ${stdout}`);
});

const updateCommand = 'npm run update';

exec(updateCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`exec error output: ${stderr}`);
    return;
  }
  console.log(`update: ${stdout}`);
});
console.log(`new branch created: ${newBranchName}`);
console.log(
  `docs: update on ${new Date().toLocaleDateString().replaceAll('/', '-')}`
);
