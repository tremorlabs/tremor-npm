import { twMerge } from "tailwind-merge";
import { HorizontalPosition } from "lib/inputTypes";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

export const textElem = "text-sm whitespace-nowrap";

export const iconElem = (iconPosition: HorizontalPosition = "left") =>
  twMerge(
    sizing.lg.height,
    sizing.lg.width,
    iconPosition === "right"
      ? twMerge(spacing.twoXs.negativeMarginRight, spacing.xs.marginLeft)
      : twMerge(spacing.twoXs.negativeMarginLeft, spacing.xs.marginRight),
  );
