import { DialogBackdrop, Dialog as HeadlessUiDialog, Transition } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: (val: boolean) => void;
  role?: "dialog" | "alertdialog";
} & XOR<{ unmount?: boolean }, { static?: boolean }>;

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <Transition appear show={props.open}>
      <HeadlessUiDialog ref={ref} {...other} className={tremorTwMerge("relative z-50", className)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-slate-950/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-slate-950/50"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">{children}</div>
        </div>
      </HeadlessUiDialog>
    </Transition>
  );
});

Dialog.displayName = "Dialog";

export { Dialog, type DialogProps };
