import { tremorTwMerge } from "lib";
import React from "react";

import { makeClassName } from "lib";

const makeListClassName = makeClassName("List");

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={tremorTwMerge(
          makeListClassName("root"),
          // common
          "w-full overflow-hidden divide-y",
          // light
          "divide-tremor-border text-tremor-content",
          // dark
          "dark:divide-dark-tremor-border dark:text-dark-tremor-content",
          className,
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

List.displayName = "List";

export default List;
