export const useEvent = (fn) => {
  const ref = useRef([fn, (...args) => ref[0](...args)]).current;
  useLayoutEffect(() => {
    ref[0] = fn;
  });
  return ref[1];
}