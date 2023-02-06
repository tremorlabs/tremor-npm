import React from "react";
import clsx from "clsx";

import { border, parseHeight, spacing } from "lib";
import { Height } from "../../../lib";

export interface FooterProps {
  height?: Height;
  children: React.ReactNode;
}

const Footer = ({ height = "h-14", children }: FooterProps) => {
  return (
    <>
      <div className={clsx(parseHeight(height))} />
      <div
        className={clsx(
          "tremor-base tr-absolute tr-flex tr-items-center tr-w-full",
          parseHeight(height),
          spacing.none.left,
          spacing.none.right,
          spacing.none.bottom,
          spacing.threeXl.paddingLeft,
          spacing.threeXl.paddingRight,
          border.sm.top,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Footer;
