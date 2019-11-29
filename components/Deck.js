import React, { useState, useCallback, useMemo } from "react";

import useEvent from "./useEvent";
import Slide from "./Slide";
import styles from "./Deck.css";

export default function Deck({ children, ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => {
    const { slides } = React.Children.toArray(children).reduce(
      (slideAccumulator, currentNode) => {
        if (currentNode.props.mdxType === "hr") {
          slideAccumulator.slideIndex += 1;
          slideAccumulator.slides[slideAccumulator.slideIndex] = [];
        } else {
          slideAccumulator.slides[slideAccumulator.slideIndex].push(
            currentNode
          );
        }
        return slideAccumulator;
      },
      {
        slides: [[]],
        slideIndex: 0
      }
    );
    return slides;
  }, [children]);

  const handleNavigation = useCallback(
    e => {
      switch (e.key) {
        case "ArrowRight":
          const nextOrMax = Math.min(currentIndex + 1, slides.length - 1);
          setCurrentIndex(nextOrMax);
          break;
        case "ArrowLeft":
          const prevOrMin = Math.max(currentIndex - 1, 0);
          setCurrentIndex(prevOrMin);
          break;
      }
    },
    [currentIndex, setCurrentIndex, slides]
  );

  useEvent("keydown", handleNavigation);

  return (
    <div className={styles.deck}>
      {slides.map((slideNodes, i) => (
        <Slide isActive={i === currentIndex} key={`slide-${i}`}>
          {slideNodes}
        </Slide>
      ))}
    </div>
  );
}
