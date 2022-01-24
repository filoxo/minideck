// @ts-check
import { useEffect } from "react";

/**
 * Bind a DOM event hander to a target.
 * @param { string } name - event name to bind to
 * @param { EventListener } handler - event handler
 * @param { Element | Window } [target] - target to bind to
 * @param { object } [options] - event options passed to addEventListener
 */
const useEvent = (name, handler, target = window, options) => {
  useEffect(() => {
    if (!handler || !target) return;
    target.addEventListener(name, handler, options);
    return () => {
      target.removeEventListener(name, handler, options);
    };
  }, [name, handler, target, JSON.stringify(options)]);
};

export default useEvent;
