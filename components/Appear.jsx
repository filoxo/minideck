// @ts-check
import React from "react";

/**
 * Wraps the rendered element in hidden styling.
 * The useAppearSequence hook modifies the visibility of this component directly.
 * You may also provide an `order` prop to specify the order in which to appear in sequence.
 * 
 * @param { object } props
 * @param { boolean } props.order - order in which to appear in sequence
 * @param { JSX.Element } props.children
 */
export default function Appear({ order, ...props }) {
  return (
    <span
      {...props}
      className="invisible"
      data-appear="false"
      data-appear-order={order}
    />
  );
}
