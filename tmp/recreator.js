const fs = require('fs');

const dir = fs.readdirSync('./').filter((a) => /\d+/u.exec(a)?.[0] && a.includes('png') || a.includes('mp4')).sort((a, b) => Number(/\d+/u.exec(a)[0]) - Number(/\d+/u.exec(b)[0]));
const newFiles = [];

for (const path of dir) {
  newFiles.push(fs.readFileSync(path));
}

const write = (index) => {
  if (!dir[index]) return;

  fs.writeFileSync(`./new/${ dir[index] }`, newFiles[index]);

  setTimeout(() => {
    write(index + 1);
  }, 1000);
};

write(0);
