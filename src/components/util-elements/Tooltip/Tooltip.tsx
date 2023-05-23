import React, { useState } from "react";
import {
  ExtendedRefs,
  ReferenceType,
  Strategy,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { twMerge } from "tailwind-merge";
import { DEFAULT_COLOR, borderRadius, colorPalette, getColorClassNames, spacing } from "lib";

export const useTooltip = () => {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return {
    tooltipProps: {
      open,
      x,
      y,
      refs,
      strategy,
      getFloatingProps,
    },
    getReferenceProps,
  };
};

export interface TooltipProps {
  text?: string;
  open: boolean;
  x: number | null;
  y: number | null;
  refs: ExtendedRefs<ReferenceType>;
  strategy: Strategy;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined,
  ) => Record<string, unknown>;
}

const Tooltip = ({ text, open, x, y, refs, strategy, getFloatingProps }: TooltipProps) => {
  return open && text ? (
    <div
      className={twMerge(
        "w-max text-sm z-20",
        getColorClassNames(DEFAULT_COLOR, colorPalette.darkestBackground).bgColor,
        getColorClassNames("white").textColor,
        borderRadius.md.all,
        spacing.md.paddingX,
        spacing.twoXs.paddingY,
      )}
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      }}
      {...getFloatingProps()}
    >
      {text}
    </div>
  ) : null;
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
