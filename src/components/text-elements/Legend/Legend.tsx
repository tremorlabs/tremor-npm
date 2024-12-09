import React, { useCallback, useEffect } from "react";

import { ChevronLeftFill, ChevronRightFill } from "assets";
import { Color, getColorClassNames, themeColorRange, tremorTwMerge } from "lib";
import { colorPalette } from "lib/theme";

export interface LegendItemProps {
  name: string;
  color: Color | string;
  onClick?: (name: string, color: Color | string) => void;
  activeLegend?: string;
}

const LegendItem = ({ name, color, onClick, activeLegend }: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <li
      className={tremorTwMerge(
        // common
        "group rounded-tremor-small inline-flex items-center px-2 py-0.5 whitespace-nowrap transition",
        hasOnValueChange ? "cursor-pointer" : "cursor-default",
        // light
        "text-tremor-content",
        hasOnValueChange ? "hover:bg-tremor-background-subtle" : "",
        // dark
        "dark:text-dark-tremor-content",
        hasOnValueChange ? "dark:hover:bg-dark-tremor-background-subtle" : "",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <svg
        className={tremorTwMerge(
          "mr-1.5 h-2 w-2 shrink-0",
          getColorClassNames(color, colorPalette.text).textColor,
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
        )}
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={4} />
      </svg>
      <p
        className={tremorTwMerge(
          // common
          "text-tremor-default truncate whitespace-nowrap",
          // light
          "text-tremor-content",
          hasOnValueChange ? "group-hover:text-tremor-content-emphasis" : "",
          // dark
          "dark:text-dark-tremor-content",
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
          hasOnValueChange ? "dark:group-hover:text-dark-tremor-content-emphasis" : "",
        )}
      >
        {name}
      </p>
    </li>
  );
};

export interface ScrollButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
}

const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const Icon = icon;
  const [isPressed, setIsPressed] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        onClick?.();
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPressed, onClick]);

  useEffect(() => {
    if (disabled) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setIsPressed(false);
    }
  }, [disabled]);

  return (
    <button
      type="button"
      className={tremorTwMerge(
        // common
        "group rounded-tremor-small inline-flex w-5 items-center truncate transition",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        // light
        disabled
          ? "text-tremor-content-subtle"
          : "text-tremor-content hover:text-tremor-content-emphasis hover:bg-tremor-background-subtle",
        // dark
        disabled
          ? "dark:text-dark-tremor-subtle"
          : "dark:text-dark-tremor dark:hover:text-tremor-content-emphasis dark:hover:bg-dark-tremor-background-subtle",
      )}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setIsPressed(false);
      }}
    >
      <Icon className={"w-full"} />
    </button>
  );
};

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: (Color | string)[];
  onClickLegendItem?: (category: string, color: Color | string) => void;
  activeLegend?: string;
  enableLegendSlider?: boolean;
}

type HasScrollProps = {
  left: boolean;
  right: boolean;
};

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const {
    categories,
    colors = themeColorRange,
    className,
    onClickLegendItem,
    activeLegend,
    enableLegendSlider = false,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const scrollButtonsRef = React.useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);
  const [isKeyDowned, setIsKeyDowned] = React.useState<string | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const checkScroll = useCallback(() => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) return;

    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll = scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  }, [setHasScroll]); // dependencies are listed here in the array

  const scrollToTest = useCallback(
    (direction: "left" | "right") => {
      const element = scrollableRef?.current;
      const scrollButtons = scrollButtonsRef?.current;
      const width = element?.clientWidth ?? 0;
      const scrollButtonsWith = scrollButtons?.clientWidth ?? 0;

      if (element && enableLegendSlider) {
        element.scrollTo({
          left:
            direction === "left"
              ? element.scrollLeft - width + scrollButtonsWith
              : element.scrollLeft + width - scrollButtonsWith,
          behavior: "smooth",
        });
        setTimeout(() => {
          checkScroll();
        }, 400);
      }
    },
    [enableLegendSlider, checkScroll],
  );

  React.useEffect(() => {
    const keyDownHandler = (key: string) => {
      if (key === "ArrowLeft") {
        scrollToTest("left");
      } else if (key === "ArrowRight") {
        scrollToTest("right");
      }
    };
    if (isKeyDowned) {
      keyDownHandler(isKeyDowned);
      intervalRef.current = setInterval(() => {
        keyDownHandler(isKeyDowned);
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isKeyDowned, scrollToTest]);

  const keyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setIsKeyDowned(e.key);
    }
  };
  const keyUp = (e: KeyboardEvent) => {
    e.stopPropagation();
    setIsKeyDowned(null);
  };

  React.useEffect(() => {
    const scrollable = scrollableRef?.current;
    if (enableLegendSlider) {
      checkScroll();

      scrollable?.addEventListener("keydown", keyDown);
      scrollable?.addEventListener("keyup", keyUp);
    }

    return () => {
      //   document.removeEventListener("keydown", keyDown);
      //   document.removeEventListener("keyup", keyUp);
      scrollable?.removeEventListener("keydown", keyDown);
      scrollable?.removeEventListener("keyup", keyUp);
    };
  }, [checkScroll, enableLegendSlider]);

  return (
    <ol ref={ref} className={tremorTwMerge("relative overflow-hidden", className)} {...other}>
      <div
        ref={scrollableRef}
        tabIndex={0}
        className={tremorTwMerge(
          //common
          "flex h-full",
          enableLegendSlider
            ? hasScroll?.right || hasScroll?.left
              ? "snap-mandatory items-center overflow-auto pr-12 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : ""
            : "flex-wrap",
        )}
      >
        {categories.map((category, idx) => (
          <LegendItem
            key={`item-${idx}`}
            name={category}
            color={colors[idx % colors.length]}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
      </div>
      {enableLegendSlider && (hasScroll?.right || hasScroll?.left) ? (
        <>
          <div
            className={tremorTwMerge(
              // light mode
              "bg-tremor-background",
              // dark mode
              "dark:bg-dark-tremor-background",
              // common
              "absolute top-0 right-0 bottom-0 flex h-full items-center justify-center pr-1",
            )}
            ref={scrollButtonsRef}
          >
            <ScrollButton
              icon={ChevronLeftFill}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest("left");
              }}
              disabled={!hasScroll?.left}
            />
            <ScrollButton
              icon={ChevronRightFill}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest("right");
              }}
              disabled={!hasScroll?.right}
            />
          </div>
        </>
      ) : null}
    </ol>
  );
});

Legend.displayName = "Legend";

export default Legend;
