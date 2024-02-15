module.exports = {
  rules: {
    'rulesdir/fc-sorting': [
      'error',
      { groups: [
        'useInject',
        'useSyncExternalStore',
        'useStore',
        'useState',
        'useRef',
        'useEvent',
        'useCallback',
        'useEffect',
        'useUpdateEffect',
        'useAsyncEffect',
        'useAsyncUpdateEffect'
      ] }
    ]
  }
};
