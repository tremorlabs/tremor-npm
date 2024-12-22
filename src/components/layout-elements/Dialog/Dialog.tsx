import React from "react";
import { Dialog as HeadlessUiDialog, DialogBackdrop, Transition } from "@headlessui/react";
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
    <Transition appear show={props.open}>
      <HeadlessUiDialog
        ref={ref}
        {...other}
        className={tremorTwMerge(makeDisplayClassName("root"), "relative z-50", className)}
      >
        <DialogBackdrop
          transition
          className="fixed bg-slate-950/30  dark:bg-slate-950/50  inset-0  transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 overflow-y-auto w-screen">
          <div className="flex min-h-full items-center justify-center p-4">{children}</div>
        </div>
      </HeadlessUiDialog>
    </Transition>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
