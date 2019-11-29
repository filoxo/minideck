import { createContext, useContext } from "react";

export const AppearContext = createContext({
  register: () => {},
  slide: {}
});

export const useAppearContext = () => useContext(AppearContext);

export const SlideContext = createContext(null);

export const useSlideContext = () => useContext(SlideContext);

export const DeckContext = createContext({
  currentSlideIndex: 0
});

export const useDeckContext = () => useContext(DeckContext);
