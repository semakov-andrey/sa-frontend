import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

const EXTENSIONS = [ '.png' ];
const INPUT_DIRECTORY = 'input';
const OUTPUT_DIRECTORY = 'output';
const SORT_BY_NUMBER = true;
const timeout = (ms) => new Promise((resolve) => {
  global.setTimeout(resolve, ms);
});

const files = fs
  .readdirSync(path.resolve(DIRNAME, INPUT_DIRECTORY))
  .filter((fileName) => EXTENSIONS.some((EXTENSION) => fileName.endsWith(EXTENSION)));

if (SORT_BY_NUMBER) {
  files.sort((fileNameA, fileNameB) =>
    Number(/\d+/u.exec(fileNameA)[0]) - Number(/\d+/u.exec(fileNameB)[0]));
}

const newFiles = files.map((fileName) =>
  [ fileName, fs.readFileSync(path.resolve(DIRNAME, INPUT_DIRECTORY, fileName)) ]);

for await (const newFile of newFiles) {
  fs.writeFileSync(path.resolve(DIRNAME, OUTPUT_DIRECTORY, newFile[0]), newFile[1]);
  console.info(`Created file: ${ newFile[0] }, ${ new Date().toLocaleDateString('ru-RU') } ${ new Date().toLocaleTimeString('ru-RU') }`);
  await timeout(1000);
}
