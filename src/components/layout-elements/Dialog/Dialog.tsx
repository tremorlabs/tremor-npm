import React from "react";
import { border, makeClassName, tremorTwMerge } from "lib";
import { Dialog as HeadlessuiDialog } from "@headlessui/react";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("Dialog");

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: (val: boolean) => void;
} & XOR<{ unmount?: boolean }, { static?: boolean }>;

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    props = {
      open: false,
      onClose: () => {},
      unmount: true,
    },
    ref,
  ) => {
    const { children, className, ...other } = props;
    const rootStyles =
      React.useContext(RootStylesContext) ?? tremorTwMerge(border.sm.all, "rounded-tremor-default");

    return (
      <HeadlessuiDialog
        as="div"
        ref={ref}
        {...other}
        className={tremorTwMerge(
          makeDisplayClassName("root"),
          //light
          "bg-tremor-background border-tremor-border",
          // dark
          "dark:bg-dark-tremor-background dark:border-dark-tremor-border",
          // dialog
          "relative z-50",
          className,
        )}
      >
        <div className="fixed inset-0 bg-dark-tremor-background/20 dark:bg-tremor-background/20 opacity-50"></div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <HeadlessuiDialog.Panel
              className={tremorTwMerge(
                "w-full max-w-xl transform overflow-hidden",
                "bg-tremor-background border-tremor-border",
                "dark:bg-dark-tremor-background dark:border-dark-tremor-border",
                "p-6 text-left align-middle shadow-tremor transition-all rounded-xl",
                rootStyles,
              )}
            >
              {children}
            </HeadlessuiDialog.Panel>
          </div>
        </div>
      </HeadlessuiDialog>
    );
  },
);

Dialog.displayName = "Dialog";

export default Dialog;
