import React from "react";

import { Color, tremorTwMerge } from "../../../lib";
import { getColorClassNames, makeClassName, sizing, spacing, themeColorRange } from "lib";
import { colorPalette } from "lib/theme";
import { ChevronLeftFill, ChevronRightFill } from "assets";

const makeLegendClassName = makeClassName("Legend");

export interface LegendItemProps {
  name: string;
  color: Color;
  onClick?: (name: string, color: Color) => void;
  activeLegend?: string;
}

const LegendItem = ({ name, color, onClick, activeLegend }: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <li
      className={tremorTwMerge(
        makeLegendClassName("legendItem"),
        // common
        "group inline-flex items-center px-2 py-0.5 rounded-tremor-small transition whitespace-nowrap",
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
          "flex-none",
          getColorClassNames(color, colorPalette.text).textColor,
          sizing.xs.height,
          sizing.xs.width,
          spacing.xs.marginRight,
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
          "whitespace-nowrap truncate text-tremor-default",
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
  }, [isPressed]);

  return (
    <button
      className={tremorTwMerge(
        makeLegendClassName("legendScrollButton"),
        // common
        "w-5 group inline-flex items-center truncate rounded-tremor-small transition",
        disabled ? "cursor-not-allowed" : "ursor-pointer",
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
  colors?: Color[];
  onClickLegendItem?: (category: string, color: Color) => void;
  activeLegend?: string;
  allowScroll?: boolean;
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
    allowScroll = false,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);

  const checkScroll = () => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) return;
    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll = scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  };

  const scrollToTest = (direction: "left" | "right") => {
    const element = scrollableRef?.current;
    const width = element?.clientWidth ?? 0;

    if (element && allowScroll) {
      element.scrollTo({
        left: direction === "left" ? element.scrollLeft - width : element.scrollLeft + width,
        behavior: "smooth",
      });
      setTimeout(() => {
        checkScroll();
      }, 400);
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scrollToTest("left");
    } else if (e.key === "ArrowRight") {
      scrollToTest("right");
    }
  };

  React.useEffect(() => {
    if (allowScroll) {
      checkScroll();

      document.addEventListener("keydown", keyDownHandler);
    }

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <ol
      ref={ref}
      className={tremorTwMerge(makeLegendClassName("root"), "relative overflow-hidden", className)}
      {...other}
    >
      <div
        ref={scrollableRef}
        className={tremorTwMerge(
          //common
          "h-full flex",
          allowScroll
            ? "pl-4 pr-12  items-center overflow-auto snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            : "flex-wrap",
        )}
      >
        {categories.map((category, idx) => (
          <LegendItem
            key={`item-${idx}`}
            name={category}
            color={colors[idx]}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
      </div>
      {allowScroll && (hasScroll?.right || hasScroll?.left) ? (
        <>
          <div
            className={tremorTwMerge(
              "absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none",
            )}
          />
          <div
            className={tremorTwMerge(
              "absolute top-0 bottom-0 right-10 w-4 bg-gradient-to-r from-transparent to-white pointer-events-none",
            )}
          />
          <div
            className={tremorTwMerge(
              "absolute flex top-0 pr-1 bottom-0 right-0 flex items-center justify-center h-full bg-tremor-background",
            )}
          >
            <ScrollButton
              icon={ChevronLeftFill}
              onClick={() => scrollToTest("left")}
              disabled={!hasScroll?.left ?? true}
            />
            <ScrollButton
              icon={ChevronRightFill}
              onClick={() => scrollToTest("right")}
              disabled={!hasScroll?.right ?? true}
            />
          </div>
        </>
      ) : null}
    </ol>
  );
});

Legend.displayName = "Legend";

export default Legend;
