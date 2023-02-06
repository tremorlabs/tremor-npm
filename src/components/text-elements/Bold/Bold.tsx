import React from "react";
import clsx from "clsx";

import { fontSize, fontWeight } from "lib";

export interface BoldProps {
  children: React.ReactNode;
}

const Bold = ({ children }: BoldProps) => {
  return (
    <span className={clsx("tremor-base tr-text-inherit", fontSize.sm, fontWeight.lg)}>
      {children}
    </span>
  );
};

export default Bold;
