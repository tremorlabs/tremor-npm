// DeprecationWarning: The `Footer` component is deprecated and will be removed with the next major release.

import React from "react";
import clsx from "clsx";

import { border, parseHeight, spacing } from "lib";

export interface FooterProps {
  height?: string;
  children: React.ReactNode;
}

const Footer = ({ height = "h-14", children }: FooterProps) => {
  console.log(
    "DeprecationWarning: The `Footer` component is deprecated and will be removed with the next major release.",
  );

  return (
    <>
      <div className={clsx(parseHeight(height))} />
      <div
        className={clsx(
          "absolute flex items-center w-full",
          parseHeight(height),
          spacing.none.left,
          spacing.none.right,
          spacing.none.bottom,
          spacing.threeXl.paddingX,
          border.sm.top,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Footer;
