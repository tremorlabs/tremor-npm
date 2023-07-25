import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fontSize, fontWeight, getColorClassNames, makeClassName, Color } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Text } from "components/text-elements";
import { Col, Grid } from "components/layout-elements/Grid";

const makeNavBarClassName = makeClassName("Navbar");

export type NavbarItem = {
  key: string;
  label: string | React.ReactNode;
  link?: string;
  openInNewTab?: boolean;
  icon?: React.ElementType;
  renderChild?: (key: string) => React.ReactNode;
};

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavbarItem[];
  className?: string;
  onItemChange?: (key: string) => void;
  color: Color;
  renderChild?: (key: string, item: NavbarItem, itemComponent: React.ReactNode) => React.ReactNode;
}

const getColClassName = (color: Color) =>
  `group relative border-${color}-500 w-full h-full flex items-center justify-center cursor-pointer`;

const HoverIndicator = (props: { color: Color }) => (
  <span
    style={{ top: "80%" }}
    className={`group-hover:block hidden w-2 h-2 bg-${props.color}-500 absolute rounded-full`}
  ></span>
);

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      items = [],
      className = "default-navbar",
      onItemChange,
      color = "blue",
      renderChild,
      ...other
    },
    ref,
  ) => {
    const [activeChild, setActiveChild] = useState<React.ReactNode>(null);
    const [activeItem, setActiveItem] = useState(items && items.length > 0 ? items[0].key : "");

    useEffect(() => {
      onItemChange?.(activeItem);
      const item = items.find((item) => item.key === activeItem);
      if (item) {
        const itemChild = item?.renderChild?.(activeItem) || null;
        const navBarChild = renderChild?.(activeItem, item, itemChild);
        setActiveChild(navBarChild || itemChild || null);
      }
    }, [activeItem, items, onItemChange, renderChild]);

    return (
      <div
        ref={ref}
        className={twMerge(
          makeNavBarClassName("root"),
          "w-full text-xl rounded-2xl",
          getColorClassNames("white").bgColor,
          getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).ringColor,
          "ring-1",
          "pb-0.5",
          className,
        )}
        {...other}
      >
        <nav className="max-w-7xl mx-auto px-4">
          <Grid numItems={items.length} className="h-16 items-center justify-items-center">
            {/* className="flex items-center justify-between h-16" */}
            {items.map((item) => {
              const Icon = item.icon;
              return item.link ? (
                <Col
                  onClick={() => setActiveItem(item.key)}
                  key={item.key}
                  className={twMerge(
                    getColClassName(color),
                    activeItem === item.key && "border-b-2",
                    `text-${color}-500`,
                  )}
                >
                  <HoverIndicator {...{ color }} />
                  <a
                    href={item.link}
                    className={twMerge(
                      "w-full h-full flex items-center justify-center",
                      fontSize.sm,
                      fontWeight.sm,
                      className,
                      "hover:underline",
                    )}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    rel={item.openInNewTab ? "noopener noreferrer" : ""}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {item.label}
                  </a>
                </Col>
              ) : (
                <Col
                  key={item.key}
                  onClick={() => setActiveItem(item.key)}
                  className={twMerge(
                    getColClassName(color),
                    activeItem === item.key && "border-b-2",
                    `text-${color}-500`,
                  )}
                >
                  <HoverIndicator {...{ color }} />
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {typeof item.label === "string" ? (
                    <Text className={twMerge(fontSize.sm, fontWeight.sm, `text-${color}-500`)}>
                      {item.label}
                    </Text>
                  ) : (
                    <div className={twMerge(fontSize.sm, fontWeight.sm)}>{item.label}</div>
                  )}
                </Col>
              );
            })}
          </Grid>
        </nav>
        {activeChild && <div>{activeChild}</div>}
      </div>
    );
  },
);

Navbar.displayName = "Navbar";

export default Navbar;
