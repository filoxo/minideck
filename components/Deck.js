import React, { useMemo } from "react";
import { store, view } from "react-easy-state";
import { path } from "react-easy-params";

import useEvent from "./useEvent";
import Slide from "./Slide";

const slides = store({
  index: 0,
  list: [[]],
  next: () =>
    (path[0] = slides.index = Math.min(
      slides.index + 1,
      slides.list.length - 1
    )),
  prev: () => (path[0] = slides.index = Math.max(slides.index - 1, 0)),
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

  useEvent("keydown", ({ key }) => {
    if (key === "ArrowRight") slides.next();
    if (key === "ArrowLeft") slides.prev();
  });

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {slides.list.map((slideNodes, i) => (
        <Slide isActive={i === slides.index} key={`slide-${i}`}>
          {slideNodes}
        </Slide>
      ))}
    </div>
  );
});

export default Deck;
