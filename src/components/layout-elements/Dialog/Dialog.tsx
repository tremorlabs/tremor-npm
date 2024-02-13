import React from "react";
import { Dialog as HeadlessuiDialog, Transition } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";

const makeDisplayClassName = makeClassName("dialog");

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: (val: boolean) => void;
  role?: "dialog" | "alertdialog";
} & XOR<{ unmount?: boolean }, { static?: boolean }>;

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <Transition as={React.Fragment} appear show={props.open}>
      <HeadlessuiDialog
        as="div"
        ref={ref}
        {...other}
        className={tremorTwMerge(makeDisplayClassName("root"), "relative z-50", className)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={tremorTwMerge(
              "fixed inset-0 bg-slate-950/30  dark:bg-slate-950/50 transition-opacity",
            )}
          ></div>
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto w-screen">
          <div className="flex min-h-full items-center justify-center p-4">{children}</div>
        </div>
      </HeadlessuiDialog>
    </Transition>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
