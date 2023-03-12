import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName } from "lib";
import { AlignItems, FlexDirection, JustifyContent } from "../../../lib";

const makeFlexClassName = makeClassName("Flex");

const justifyContentClassNames: { [key in JustifyContent]: string } = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignItmesClassNames: { [key in AlignItems]: string } = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const flexDirectionClassNames: { [key in FlexDirection]: string } = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  children: React.ReactNode;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    flexDirection = "row",
    justifyContent = "between",
    alignItems = "center",
    children,
    className,
    ...other
  } = props;

  return (
    <div
      ref={ref}
      className={twMerge(
        makeFlexClassName("root"),
        "flex w-full",
        flexDirectionClassNames[flexDirection],
        justifyContentClassNames[justifyContent],
        alignItmesClassNames[alignItems],
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
});

export default Flex;
