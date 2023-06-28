export const TSErrorsCounterWebpackPlugin = (forkTsCheckerWebpackPlugin) =>
  class TSErrorsCounterPlugin {
    apply(compiler) {
      const waitTime = 1500;
      forkTsCheckerWebpackPlugin.getCompilerHooks(compiler).issues.tap('MyPlugin', (issues) => {
        if (issues.length > 0) {
          setTimeout(() => console.info(`${ issues.length } typescript errors`), waitTime);
        }
      });
    }
  };
