module.exports = {
  rules: {
    'rulesdir/fc-sorting': [
      'error',
      { groups: [
        'useInject',
        'useSyncExternalStore',
        'useState',
        'useRef',
        'useEffect',
        'useEvent',
        'useCallback'
      ] }
    ]
  }
};
