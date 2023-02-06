import React from "react";
import clsx from "clsx";

import { fontSize } from "lib";

export interface ItalicProps {
  children: React.ReactNode;
}

const Italic = ({ children }: ItalicProps) => {
  return <span className={clsx("tremor-base italic text-inherit", fontSize.sm)}>{children}</span>;
};

export default Italic;
