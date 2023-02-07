import React from "react";

import { MarginTop, MaxWidth, SpaceY, TextAlignment } from "../../../lib/inputTypes";

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: MaxWidth;
  spaceY?: SpaceY | "";
  textAlignment?: TextAlignment;
  truncate?: boolean;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Block = React.forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <div ref={ref} className={className} {...other}>
      {children}
    </div>
  );
});

export default Block;
