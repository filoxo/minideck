import React, { useMemo } from 'react';

export default function ProgressIndicator({
  type = ProgressIndicator.LINE,
  currentIndex,
  max,
}) {
  switch (type) {
    case ProgressIndicator.LINE:
      return <LineProgressIndicator progress={(currentIndex / max) * 100} />;
    case ProgressIndicator.DOT:
      return (
        <DotProgressIndicator
          currentIndex={currentIndex}
          numberOfSteps={max + 1}
        />
      );
    case ProgressIndicator.NUMBER:
      return (
        <NumberProgressIndicator
          currentNumber={currentIndex + 1}
          numberOfSteps={max + 1}
        />
      );
    default:
      throw new Error('Unknown ProgressIndicator type! Received ' + type);
  }
}

ProgressIndicator.LINE = 'line';
ProgressIndicator.DOT = 'dot';
ProgressIndicator.NUMBER = 'number';

/*
This doesn't seem to fit the [ARIA definition of a progressbar](https://www.w3.org/TR/wai-aria-1.1/#progressbar).
Also, that state is communicated through [aria-current](https://www.w3.org/TR/wai-aria-1.1/#aria-current) on the Slide component,
so this and the other progress types will be aria-hidden.
*/
function LineProgressIndicator({ progress }) {
  return (
    <div
      aria-hidden
      className="fixed bottom-0 w-screen bg-gray-400 transition-all"
    >
      <div
        className="pb-1 bg-blue-500 transition-all duration-75 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

function DotProgressIndicator({ currentIndex, numberOfSteps }) {
  const dots = useMemo(() => Array.from(new Array(numberOfSteps), () => Dot), [
    numberOfSteps,
  ]);

  return (
    <div
      aria-hidden
      className="fixed bottom-0 pb-2 w-screen flex justify-center"
    >
      {dots.map((Dot, i) => (
        <Dot key={`dot-${i}`} active={currentIndex === i} />
      ))}
    </div>
  );
}

function Dot({ active }) {
  return (
    <span
      className={`w-2 pb-2 rounded-full mx-1 ${
        active ? 'bg-blue-400' : 'bg-gray-400'
      }`}
    ></span>
  );
}

function NumberProgressIndicator({ currentNumber, numberOfSteps }) {
  return (
    <span
      aria-hidden
      className="fixed bottom-0 right-0 p-2 font-mono text-sm text-gray-600"
    >
      {currentNumber}/{numberOfSteps}
    </span>
  );
}
