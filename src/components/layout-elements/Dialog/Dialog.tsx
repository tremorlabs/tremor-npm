import React from "react";
import { makeClassName, tremorTwMerge } from "lib";
import { Dialog as HeadlessuiDialog } from "@headlessui/react";

const makeDisplayClassName = makeClassName("dialog");

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: (val: boolean) => void;
} & XOR<{ unmount?: boolean }, { static?: boolean }>;

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, className, ...other } = props;

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
      <div className="fixed backdrop-blur-sm inset-0 bg-tremor-background/30 dark:bg-dark-tremor-background/30 opacity-50"></div>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          {children}
        </div>
      </div>
    </HeadlessuiDialog>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
