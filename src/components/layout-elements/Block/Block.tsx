import React from "react";

import {
  MarginTop,
  MaxWidth,
  SpaceY,
  TextAlignment,
} from "../../../lib/inputTypes";
import {
  TextAlignments,
  classNames,
  parseMarginTop,
  parseMaxWidth,
  parseSpaceY,
  parseTextAlignment,
  parseTruncateOption,
} from "lib";

export interface BlockProps {
  maxWidth?: MaxWidth;
  spaceY?: SpaceY | "";
  textAlignment?: TextAlignment;
  truncate?: boolean;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Block = ({
  maxWidth = "max-w-none",
  spaceY = "",
  textAlignment = TextAlignments.Left,
  truncate = false,
  marginTop = "mt-0",
  children,
}: BlockProps) => {
  return (
    <div
      className={classNames(
        "tr-w-full",
        parseMaxWidth(maxWidth),
        spaceY ? parseSpaceY(spaceY) : spaceY,
        parseTextAlignment(textAlignment),
        parseTruncateOption(truncate),
        truncate ? "tr-whitespace-nowrap" : "",
        parseMarginTop(marginTop)
      )}
    >
      {children}
    </div>
  );
};

export default Block;
