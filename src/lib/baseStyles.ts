import clsx from "clsx";
import { HorizontalPosition } from "lib/inputTypes";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

export const textElem = "text-sm whitespace-nowrap";

export const iconElem = (iconPosition: HorizontalPosition = "left") =>
  clsx(
    sizing.lg.height,
    sizing.lg.width,
    iconPosition === "right"
      ? clsx(spacing.twoXs.negativeMarginRight, spacing.xs.marginLeft)
      : clsx(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight),
  );
