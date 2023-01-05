import React from "react";

import { border, classNames, parseHeight, spacing } from "lib";
import { Height } from "../../../lib";

export interface FooterProps {
  height?: Height;
  children: React.ReactNode;
}

const Footer = ({ height = "h-14", children }: FooterProps) => {
  return (
    <>
      <div className={classNames(parseHeight(height))} />
      <div
        className={classNames(
          "tremor-base tr-absolute tr-flex tr-items-center tr-w-full",
          parseHeight(height),
          spacing.none.left,
          spacing.none.right,
          spacing.none.bottom,
          spacing.threeXl.paddingLeft,
          spacing.threeXl.paddingRight,
          border.sm.top
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Footer;
