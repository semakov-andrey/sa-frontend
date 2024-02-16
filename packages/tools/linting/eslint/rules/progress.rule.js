import fg from 'fast-glob';
import logUpdate from 'log-update';

let glob;
let files;
const fullPercents = 100;

export const eslintRuleProgress = {
  create(context) {
    if (!glob && process && Array.isArray(process.argv) && typeof process.argv[2] === 'string') {
      try {
        glob = process.argv[2];
        if (glob) {
          files = fg.sync(glob, {
            absolute: true,
            ignore: [ '**/node_modules/**', '**/build/**' ]
          }).sort();
        }
      } catch (error) {
        console.error(error.message);

        return {};
      }
    }
    if (!files) return {};

    const filePath = context.filename;
    const index = files.findIndex((file) => file === filePath);
    if (index === -1) return {};

    const progress = Math.ceil((index + 1) * fullPercents / files.length);
    logUpdate(`Linting progress: ${ fullPercents !== progress ? `${ progress }%` : 'done' }`);

    return {};
  }
};
