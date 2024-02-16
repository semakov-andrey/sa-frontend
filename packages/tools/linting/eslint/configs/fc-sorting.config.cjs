module.exports = {
  rules: {
    'rulesdir/fc-sorting': [
      'error',
      {
        states: [
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
          'useRoute'
        ],
        computingAndEvents: [
          'useMemo',
          'useEvent',
          'useCallback'
        ],
        effects: [
          'useKeyboardNavigation',
          'useKeyboardEvent',
          'useEffect',
          'useUpdateEffect',
          'useAsyncEffect',
          'useAsyncUpdateEffect',
          'useCheckEffect',
          'useDebounceEffect'
        ]
      }
    ]
  }
};

