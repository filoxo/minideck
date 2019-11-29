import React, { useState, useCallback, useMemo, useReducer } from "react";

import { DeckContext } from "./contexts";
import useEvent from "./useEvent";
import Slide from "./Slide";
import styles from "./Deck.css";

const REGISTER_APPEAR = "register";
const NEXT_APPEAR = "next";
const PREV_APPEAR = "prev";

const appearReducer = (state, action) => {
  if (action.type === REGISTER_APPEAR) {
    const { slide } = action.payload;
    const newState = { ...state };

    if (!newState[slide]) {
      newState[slide] = {
        count: 1,
        current: 0
      };
    } else {
      newState[slide].count = newState[slide].count + 1;
    }
    return newState;
  }
  if (action.type === NEXT_APPEAR) {
    const { slide } = action.payload;
    const newState = { ...state };
    if (newState[slide]) {
      const nextOrLimit = Math.min(
        newState[slide].current + 1,
        newState[slide].count
      );
      newState[slide].current = nextOrLimit;
    }
    return newState;
  }

  if (action.type === PREV_APPEAR) {
    const { slide } = action.payload;
    const newState = { ...state };
    if (newState[slide]) {
      const prevOrLimit = Math.max(newState[slide].current - 1, 0);
      newState[slide].current = prevOrLimit;
    }
    return newState;
  }

  return state;
};

export default function Deck({ children, ...props }) {
  /* Need to know:
   - current index
   - total slides count
   - direction of slide?
   - speaker mode
  */

  // Slides state
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
      <DeckContext.Provider
        value={{
          currentSlideIndex: currentIndex
        }}
      >
        {slides.map((slideNodes, i) => (
          <Slide index={i} key={`slide-${i}`}>
            {slideNodes}
          </Slide>
        ))}
      </DeckContext.Provider>
    </div>
  );
}
