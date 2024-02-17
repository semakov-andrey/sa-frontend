import { fcSortingParams } from '../params/fc-sorting.params.js';

export const eslintRuleFcSorting = {
  create: (ctx) => {
    const { states = [], computingAndEvents = [], effects = [] } = ctx.options[0] ?? fcSortingParams;
    const groups = [ ...states, ...computingAndEvents, ...effects ];

    const showError = (hook, intersectionHooks) => {
      ctx.report(
        hook,
        `Non-matching declaration order. ${ hook.name } comes after ${ intersectionHooks.join(', ') }.`
      );
    };

    const checkHook = (hook, hooksForChecking, previousHooks) => {
      const intersectionHooks = hooksForChecking.filter((hookName) => previousHooks.includes(hookName));
      if (intersectionHooks.length > 0) showError(hook, intersectionHooks);
    };

    const checkStateHook = (hook, groups, previousHooks) => {
      const intersectionHooks = previousHooks.filter((hook) => !groups.includes(hook));
      if (intersectionHooks.length > 0) showError(hook, intersectionHooks);
    };

    return {
      Program({ body }) {
        const declarationsArray = body
          .filter(({ type, declaration }) =>
            type === 'ExportNamedDeclaration' && declaration?.type === 'VariableDeclaration')
          .reduce((acc, node) => {
            const declarations = node.declaration.declarations[0].init?.body?.body;
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
            .filter((hook) => hook.name?.startsWith('use'));

          for (const hook of hooks) {
            if (groups.includes(hook.name)) {
              const findedHook = groups.indexOf(hook.name);
              const findedHookInStates = states.indexOf(hook.name);
              if (findedHook === -1 || findedHook === 0) {
                previousHooks.push(hook.name);
                continue;
              }
              if (findedHookInStates !== -1 && findedHookInStates !== 0) {
                checkStateHook(hook, groups, previousHooks);
              }
              checkHook(hook, groups.slice(findedHook + 1), previousHooks);
            } else {
              checkHook(hook, effects, previousHooks);
            }
            previousHooks.push(hook.name);
          }
        }
      }
    };
  }
};
