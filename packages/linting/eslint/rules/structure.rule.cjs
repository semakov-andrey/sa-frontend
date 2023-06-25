const path = require('path');

module.exports = {
  meta: {
    type: 'suggestion',
    schema: [ {
      type: 'object',
      properties: {
        rules: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      required: true
    } ]
  },
  create(context) {
    const rules = context.options[0].rules;
    const root = path.resolve(__dirname).split('node_modules')[0];
    const filePath = context.filename.replace(root, '');

    let matched = false;
    rules.forEach((rule) => {
      const regexp = new RegExp(`^${ rule }$`, 'u');
      if (regexp.test(filePath)) matched = true;
    });

    if (!matched) {
      context.report({
        loc: {},
        message: 'Wrong structure: check this file path'
      });
    }

    return {};
  }
};
