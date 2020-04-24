import React, { useMemo } from "react";
import { store, view } from "react-easy-state";
import { path } from "react-easy-params";

import useEvent from "./useEvent";
import Slide from "./Slide";
import styles from "./Deck.css";

const slides = store({
  index: 0,
  list: [[]],
  next: () =>
    (slides.index = path[0] = Math.min(
      slides.index + 1,
      slides.list.length - 1
    )),
  prev: () => (slides.index = path[0] = Math.max(slides.index - 1, 0)),
});

const setIndexPath = (max) => {
  const indexInt = parseInt(path[0], 10);
  if (Number.isNaN(indexInt) || indexInt < 0) {
    path[0] = 0;
  } else if (max < indexInt) {
    path[0] = max;
  } else {
    path[0] = indexInt;
  }
  slides.index = path[0];
};

const Deck = view(({ children }) => {
  useMemo(() => {
    React.Children.toArray(children).forEach((currentNode) => {
      if (currentNode.props.mdxType === "hr") {
        slides.list.push([]);
      } else {
        slides.list[slides.list.length - 1].push(currentNode);
      }
    });

    setIndexPath(slides.list.length - 1);
  }, [children]);

  useEvent("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        slides.next();
        break;
      case "ArrowLeft":
        slides.prev();
        break;
    }
  });

  return (
    <div className={styles.deck}>
      {slides.list.map((slideNodes, i) => (
        <Slide isActive={i === slides.index} key={`slide-${i}`}>
          {slideNodes}
        </Slide>
      ))}
    </div>
  );
});

export default Deck;
