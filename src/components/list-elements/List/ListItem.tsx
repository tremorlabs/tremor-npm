import React from "react";
import { makeClassName, tremorTwMerge } from "lib";

const makeListItemClassName = makeClassName("ListItem");

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <li
          ref={ref}
          className={tremorTwMerge(
            makeListItemClassName("root"),
            // common
            "w-full flex justify-between items-center text-tremor-default py-2",
            className,
          )}
          {...other}
        >
          {children}
        </li>
      </>
    );
  },
);

ListItem.displayName = "ListItem";

export default ListItem;
