module.exports = {
  rules: {
    'rulesdir/fc-sorting': [
      'error',
      { groups: [
        'useInject',
        'useSyncExternalStore',
        'useStore',
        'useState',
        'useStateWithCallback',
        'useStateRef',
        'useBoolean',
        'useRef',
        'useHistory',
        'useLocation',
        'useMatch',
        'useRoute',
        'useEvent',
        'useCallback',
        'useKeyboardNavigation',
        'useKeyboardEvent',
        'useEffect',
        'useUpdateEffect',
        'useAsyncEffect',
        'useAsyncUpdateEffect',
        'useCheckEffect',
        'useDebounceEffect'
      ] }
    ]
  }
};

