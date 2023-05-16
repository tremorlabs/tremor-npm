import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName } from "lib";

const makeListClassName = makeClassName("List");

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={twMerge(
          makeListClassName("root"),
          "w-full overflow-hidden divide-y divide-tremor-border text-tremor-content",
          className,
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

export default List;
