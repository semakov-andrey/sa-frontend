const DEFAULT_GROUPS = [
  'useState',
  'useRef',
  'useCallback',
  'useEffect'
];

module.exports = {
  create: (ctx) => {
    const options = ctx.options[0];
    const groups = options?.groups ?? DEFAULT_GROUPS;

    return {
      Program({ body }) {
        const declarationsArray = body
          .filter(({ type, declaration }) =>
            type === 'ExportNamedDeclaration' && declaration.type === 'VariableDeclaration')
          .reduce((acc, node) => {
            const declarations = node.declaration.declarations[0].init.body?.body;
            return declarations ? [ ...acc, declarations ] : [];
          }, []);

        for (const declarations of declarationsArray) {
          const nodes = (Array.isArray(declarations) ? declarations : []).reduce((acc, node) => {
            if (node.type === 'ExpressionStatement') return [ ...acc, node.expression ];
            if (node.type === 'VariableDeclaration') return [ ...acc, ...node.declarations ];
            return acc;
          }, []);

          const previousHooks = [];

          const hooks = nodes
            .map(({ type, callee, init }) =>
              type === 'CallExpression'
                ? [ type, callee ]
                : type === 'VariableDeclarator'
                  ? [ type, init ]
                  : [])
            .filter((node) => node.length === 2)
            .map(([ type, declaration ]) => {
              switch (type) {
              case 'MemberExpression':
                return declaration.property;
              case 'CallExpression':
                return declaration.type === 'MemberExpression'
                  ? declaration.property
                  : declaration.callee ?? declaration;
              case 'VariableDeclarator':
              default:
                return declaration?.callee?.property ?? declaration?.callee;
              }
            })
            .filter(Boolean)
            .filter((hook) => hook.name?.startsWith('use') && groups.includes(hook.name));

          for (const hook of hooks) {
            const findedHook = groups.indexOf(hook.name);
            if (findedHook === -1 || findedHook === 0) {
              previousHooks.push(hook.name);
              continue;
            }
            const hooksForChecking = groups.slice(findedHook + 1);
            const intersectionHooks = hooksForChecking.filter((hookName) => previousHooks.includes(hookName));
            if (intersectionHooks.length > 0) {
              ctx.report(
                hook,
                `Non-matching declaration order. ${ hook.name } comes after ${ intersectionHooks.join(', ') }.`
              );
            }
            previousHooks.push(hook.name);
          }
        }
      }
    };
  }
};
