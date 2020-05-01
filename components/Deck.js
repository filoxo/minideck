import React, { useState, useCallback, useMemo, useEffect } from "react";

import useEvent from "./useEvent";
import Slide from "./Slide";

const pushState = (currentIndex) => {
  history.pushState({ currentIndex }, null, "/" + currentIndex);
};

export default function Deck({ children }) {
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
        slideIndex: 0,
      }
    );
    return slides;
  }, [children]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const [indexPath] = window.location.pathname
      .split("/")
      .filter((s) => s !== "");

    const initialIndex = parseInt(indexPath, 10);
    const max = slides.length - 1;

    if (Number.isNaN(initialIndex) || initialIndex < 0) {
      pushState(0);
      return 0;
    } else if (max < initialIndex) {
      pushState(max);
      return max;
    } else {
      return initialIndex;
    }
  });

  const updateIndexWithUrl = (index) => {
    setCurrentIndex(index);
    pushState(index);
  };

  const handleNavigation = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        const nextOrMax = Math.min(currentIndex + 1, slides.length - 1);
        updateIndexWithUrl(nextOrMax);
      }
      if (e.key === "ArrowLeft") {
        const prevOrMin = Math.max(currentIndex - 1, 0);
        updateIndexWithUrl(prevOrMin);
      }
    },
    [currentIndex, slides]
  );

  useEffect(() => {
    function syncToUrlBack(e) {
      setCurrentIndex(e.state.currentIndex);
    }
    window.addEventListener("popstate", syncToUrlBack);
    return () => {
      window.removeEventListener("popstate", syncToUrlBack);
    };
  }, []);

  useEvent("keydown", handleNavigation);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {slides.map((slideNodes, i) => (
        <Slide isActive={i === currentIndex} key={`slide-${i}`}>
          {slideNodes}
        </Slide>
      ))}
    </div>
  );
}
