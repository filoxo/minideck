/*
`Deck` does three things:

- Iterates through the MDX document and groups elements between `---`s and puts them into `Slide`s
- Tracks that current state of the active slide
- Syncs current slide index to URL
*/

import React, { useCallback, useMemo } from 'react';
import useLocation from 'wouter/use-location';

import useEvent from './useEvent';
import useSwipeEvent from './useSwipeEvent';
import Slide from './Slide';
// import ProgressIndicator from './ProgressIndicator';

export default function Deck({ children }) {
  const slides = useMemo(() => {
    const { slides } = React.Children.toArray(children).reduce(
      (slideAccumulator, currentNode) => {
        if (currentNode.props.mdxType === 'hr') {
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

  const max = slides.length - 1;
  const [location, setLocation] = useLocation();
  const currentIndex = parseInt(location.split('/').filter((s) => !!s)[0], 10);
  const setLocationIndex = (i) => setLocation(`/${i}`);

  if (Number.isNaN(currentIndex) || currentIndex < 0) {
    setLocationIndex(0);
  } else if (max < currentIndex) {
    setLocationIndex(max);
  }

  const handleNavigation = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        const nextOrMax = Math.min(currentIndex + 1, max);
        setLocationIndex(nextOrMax);
      }
      if (e.key === 'ArrowLeft') {
        const prevOrMin = Math.max(currentIndex - 1, 0);
        setLocationIndex(prevOrMin);
      }
    },
    [currentIndex, slides]
  );

  useEvent('keydown', handleNavigation);

  const swipeEvents = useMemo(() => {
    return {
      right: () => {
        const prevOrMin = Math.max(currentIndex - 1, 0);
        setLocationIndex(prevOrMin);
      },
      left: () => {
        const nextOrMax = Math.min(currentIndex + 1, max);
        setLocationIndex(nextOrMax);
      },
    };
  }, [currentIndex]);

  useSwipeEvent(swipeEvents);

  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      {slides.map((slideNodes, i) => (
        <Slide isActive={i === currentIndex} key={`slide-${i}`}>
          {slideNodes}
        </Slide>
      ))}
      {/* <ProgressIndicator
        currentIndex={currentIndex}
        max={max}
        type={ProgressIndicator.LINE}
      /> */}
    </div>
  );
}
