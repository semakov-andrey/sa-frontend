import fg from 'fast-glob';
import logUpdate from 'log-update';

let glob;
let files;
let counter = 0;

export const eslintRuleProgress = {
  create(context) {
    if (!glob && process && Array.isArray(process.argv) && typeof process.argv[2] === 'string') {
      try {
        glob = process.argv[2];
        if (glob) {
          files = fg.sync(glob, {
            absolute: true,
            ignore: [ '**/node_modules/**', ...context.options[0] ?? [] ]
          }).sort();
        }
      } catch (error) {
        console.error(error.message);

        return {};
      }
    }
    if (!Array.isArray(files) || files.length === 0) return {};

    const filePath = context.filename;
    const index = files.findIndex((file) => file === filePath);
    if (index === -1) return {};

    counter++;
    const progress = Math.ceil(counter / files.length * 100);
    logUpdate(`Linting progress: ${ progress !== 100 ? `${ progress }%` : 'done' }`);

    return {};
  }
};
