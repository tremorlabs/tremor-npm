import {
  autoUpdate,
  ExtendedRefs,
  flip,
  offset,
  ReferenceType,
  shift,
  Strategy,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { tremorTwMerge } from "lib";
import React, { useState } from "react";

export const useTooltip = (delay?: number) => {
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && delay) {
      const timer = setTimeout(() => {
        setOpen(isOpen);
      }, delay);
      setTimeoutId(timer);
      return;
    }
    clearTimeout(timeoutId);
    setOpen(isOpen);
  };

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
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
  darkTheme?: boolean;  // for dark theme, light default
  preventWrap?: boolean;  // prevent text wrapping
  width?: string | number;  // setting width by string or number
}


const Tooltip = ({
                   text,
                   open,
                   x,
                   y,
                   refs,
                   strategy,
                   getFloatingProps,
                   darkTheme = false,
                   preventWrap = false,
                   width = 'auto'  // Default width set to 'auto'
                 }: TooltipProps) => {
  return open && text ? (
      <div
          className={tremorTwMerge(
              "text-sm z-20 rounded-tremor-default opacity-100 px-2.5 py-1",
              "overflow-hidden",
              preventWrap ? "whitespace-nowrap" : "",  // Apply based on preventWrap
              darkTheme ? "text-white dark:bg-dark-tremor-background-subtle" : "text-white bg-tremor-background-emphasis",  // Apply theme based on darkTheme
          )}
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: typeof width === 'number' ? `${width}px` : width  // Set width
          }}
          {...getFloatingProps()}
      >
        {text}
      </div>
  ) : null;
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
