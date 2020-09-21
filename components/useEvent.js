import { useEffect } from "react";

/*
Bind a DOM event hander to a target.
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
