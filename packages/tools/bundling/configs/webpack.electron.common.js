export const webpackElectronCommonConfig = (clientSourceDirectory, serverSourceDirectory) => ({
  resolve: {
    alias: {
      '@/srcClient': clientSourceDirectory,
      '@/srcServer': serverSourceDirectory
    }
  }
});
