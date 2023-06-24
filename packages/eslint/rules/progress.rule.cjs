const fg = require('fast-glob');
const logUpdate = require('log-update');

const createCLIOptions = require('../../../node_modules/eslint/lib/options.js');

let options;
let files;
const fullPercents = 100;

module.exports = {
  create(context) {
    if (!options && process && process.argv) {
      try {
        const CLIOptions = createCLIOptions();
        options = CLIOptions.parse(process.argv);
        if (options && Array.isArray(options._)) {
          files = fg.sync(options._, {
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
