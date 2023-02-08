import React from "react";
import clsx from "clsx";

import { defaultColors, getColorVariantsFromColorThemeValue } from "lib";
import { MarginTop } from "../../../lib/inputTypes";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <ul
      ref={ref}
      className={clsx(
        "w-full overflow-hidden divide-y",
        getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
        className,
      )}
      {...other}
    >
      {children}
    </ul>
  );
});

export default List;
