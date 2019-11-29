import { useRef, useEffect } from "react";

const flipAppearanceUntilFinding = bool => node => {
  const { appear } = node.dataset;
  node.dataset.appear = bool;
  bool = appear === "true";
};

const useAppearSequence = (slideRef, isCurrentStep) => {
  const appearNodes = useRef();

  useEffect(() => {
    appearNodes.current = Array.from(
      slideRef.current.querySelectorAll("[data-appear]")
    );
  }, []);

  useEffect(() => {
    const handleAppearSequence = isCurrentStep
      ? e => {
          if (isCurrentStep) {
            switch (e.key) {
              case "ArrowUp": {
                [...appearNodes.current]
                  .reverse()
                  .forEach(flipAppearanceUntilFinding(false));
                break;
              }
              case "ArrowDown": {
                appearNodes.current.forEach(flipAppearanceUntilFinding(true));
                break;
              }
              default:
                break;
            }
          }
        }
      : () => {};

    window.addEventListener("keydown", handleAppearSequence);
    return () => {
      window.removeEventListener("keydown", handleAppearSequence);
    };
  }, [isCurrentStep]);
};

export default useAppearSequence;
