// @ts-check

/*
Hash routing is ideal for this application because otherwise the
server to which the deck is deployed would need to be configured
with fallback routing. Hash routing is not sent to the server so
there is no additional configuration required.

This code is taken from wouter demo here with slight modifications:
https://github.com/molefrog/wouter#customizing-the-location-hook
*/

import { useState, useLayoutEffect } from "react";

/**
 * @returns { string } the current hash location in a normalized form (excludes the leading #)
 */
const currentLocation = () => window.location.hash.replace(/^#/, "") || "/";

/**
 * @param { string } to - the new location to navigate to
 */
export const navigate = (to) => (window.location.hash = to);

/** @returns { [string, function] } */
const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());
  
  useLayoutEffect(() => {
    const onHashChange = () => setLoc(currentLocation());
    // subscribe to hash changes
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    }
  }, []);
  
  return [loc, navigate];
};

export default useHashLocation;
