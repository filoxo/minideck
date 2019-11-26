import { useEffect } from "react";

const useEvent = (name, handler, target = window, options) => {
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!target) {
      return;
    }
    target.addEventListener(name, handler, options);
    return () => {
      target.removeEventListener(name, handler, options);
    };
  }, [name, handler, target, JSON.stringify(options)]);
};

export default useEvent;
