import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeRadioGroupLabelClassName = makeClassName("RadioGroupLabel");

const RadioGroupLabel = React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <HeadlessRadioGroup.Label
        as="div"
        ref={ref}
        {...other}
        className={tremorTwMerge(
          makeRadioGroupLabelClassName("root"),
          "cursor-pointer ui-disabled:cursor-not-allowed text-tremor-default",
          // light
          "text-tremor-content-emphasis",
          // dark
          "dark:text-dark-tremor-content-emphasis",
          className,
        )}
      >
        {children}
      </HeadlessRadioGroup.Label>
    );
  },
);

RadioGroupLabel.displayName = "RadioGroupLabel";

export default RadioGroupLabel;
