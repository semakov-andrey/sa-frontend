module.exports = {
  rules: {
    'rulesdir/fc-sorting': [
      'error',
      { groups: [
        'useInject',
        'useState',
        'useRef',
        'useEffect',
        'useEvent',
        'useCallback'
      ] }
    ]
  }
};
