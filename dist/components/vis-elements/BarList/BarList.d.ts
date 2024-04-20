import React from "react";
import { Color, ValueFormatter } from "lib";
type Bar<T> = T & {
    key?: string;
    value: number;
    name: string;
    icon?: React.JSXElementConstructor<any>;
    href?: string;
    target?: string;
    color?: Color;
};
export interface BarListProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
    data: Bar<T>[];
    valueFormatter?: ValueFormatter;
    color?: Color;
    showAnimation?: boolean;
    onValueChange?: (payload: Bar<T>) => void;
}
declare function BarListInner<T>(props: BarListProps<T>, ref: React.ForwardedRef<HTMLDivElement>): React.JSX.Element;
declare namespace BarListInner {
    var displayName: string;
}
declare const BarList: <T>(p: BarListProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement> | undefined;
}) => ReturnType<typeof BarListInner>;
export default BarList;
