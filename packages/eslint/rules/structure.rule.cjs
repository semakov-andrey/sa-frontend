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
    const filePath = context.filename.replace(`${ path.resolve(__dirname, '../../') }/`, '');

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
