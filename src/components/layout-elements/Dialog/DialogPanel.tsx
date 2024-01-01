import React from "react";
import { border, makeClassName, tremorTwMerge } from "lib";
import { Dialog as HeadlessuiDialog, Transition } from "@headlessui/react";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ?? tremorTwMerge(border.sm.all, "rounded-tremor-default");

  return (
    <Transition.Child
      as={React.Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <HeadlessuiDialog.Panel
        ref={ref}
        className={tremorTwMerge(
          makeDisplayClassName("panel"),
          "w-full max-w-xl transform overflow-hidden",
          "bg-tremor-background",
          "dark:bg-dark-tremor-background",
          "align-middle shadow-tremor transition-all p-6",
          rootStyles,
          className,
        )}
        {...other}
      >
        {children}
      </HeadlessuiDialog.Panel>
    </Transition.Child>
  );
});

DialogPanel.displayName = "DialogPanel";

export default DialogPanel;
