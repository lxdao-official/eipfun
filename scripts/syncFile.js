const fs = require('fs');

const files = fs.readdirSync('./public/original-eips/');

files.forEach((file) => {
  if (fs.existsSync(`./content/en/${file}`)) {
    // fs.appendFile(
    //   `./content/en/${file}`,
    //   `\n## Videos\n\n- [Example Video Title](https://www.youtube.com/watch?v=TDGq4aeevgY)\n\n## Projects\n\n- [Example Project Name](https://xxxx.xxx/xxxxx) Project Description (one sentence) ![this is an img's alt for the project logo](https://xxxx.xxx/project-logo.xxx)\n\n## Further Reading\n\n- [Example Article Title](https://xxxx.xxx/xxxxx) ![this is an img's alt for the article cover](https://xxxx.xxx/article-cover.xxx)\n`,
    //   function (err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   }
    // );
  } else {
    fs.writeFile(
      `./content/en/${file}`,
      `## Videos\n\n- [Example Video Title](https://www.youtube.com/watch?v=TDGq4aeevgY)\n\n## Projects\n\n- [Example Project Name](https://xxxx.xxx/xxxxx) Project Description (one sentence) ![this is an img's alt for the project logo](https://xxxx.xxx/project-logo.xxx)\n\n## Further Reading\n\n- [Example Article Title](https://xxxx.xxx/xxxxx)\n`,
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  if (fs.existsSync(`./content/zh/${file}`)) {
    // return;
  } else {
    fs.writeFile(
      `./content/zh/${file}`,
      `## Videos\n\n- [Example Video Title](https://www.youtube.com/watch?v=TDGq4aeevgY)\n\n## Projects\n\n- [Example Project Name](https://xxxx.xxx/xxxxx) Project Description (one sentence) ![this is an img's alt for the project logo](https://xxxx.xxx/project-logo.xxx)\n\n## Further Reading\n\n- [Example Article Title](https://xxxx.xxx/xxxxx)\n`,
      function (err) {
        if (err) console.log(err);
      }
    );
  }
});
