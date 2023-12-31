import React from "react";
import { border, makeClassName, tremorTwMerge } from "lib";
import { Dialog as HeadlessuiDialog } from "@headlessui/react";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ?? tremorTwMerge(border.sm.all, "rounded-tremor-default");

  return (
    <HeadlessuiDialog.Panel
      ref={ref}
      className={tremorTwMerge(
        makeDisplayClassName("panel"),
        "w-full max-w-xl transform overflow-hidden",
        "bg-tremor-background",
        "dark:bg-dark-tremor-background",
        "text-left align-middle shadow-tremor transition-all p-6",
        rootStyles,
        className,
      )}
      {...other}
    >
      {children}
    </HeadlessuiDialog.Panel>
  );
});

DialogPanel.displayName = "DialogPanel";

export default DialogPanel;
