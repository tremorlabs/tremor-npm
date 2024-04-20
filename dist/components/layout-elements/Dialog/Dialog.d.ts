import React from "react";
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onClose: (val: boolean) => void;
    role?: "dialog" | "alertdialog";
} & XOR<{
    unmount?: boolean;
}, {
    static?: boolean;
}>;
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export default Dialog;
