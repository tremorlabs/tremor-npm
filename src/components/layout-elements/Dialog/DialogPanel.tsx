import React from "react";
import { Dialog as HeadlessuiDialog, Transition } from "@headlessui/react";
import { makeClassName, spacing, tremorTwMerge } from "lib";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ??
    tremorTwMerge(spacing.threeXl.paddingAll, "rounded-tremor-default");

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
          // light
          "bg-tremor-background  text-tremor-content",
          // dark
          "dark:bg-dark-tremor-background dark:text-dark-tremor-content",
          // common
          "w-full max-w-xl overflow-hidden text-left align-middle ring-1 ring-tremor-border shadow-tremor transition-all transform",
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
