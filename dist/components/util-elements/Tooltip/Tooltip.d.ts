import { ExtendedRefs, ReferenceType, Strategy } from "@floating-ui/react";
import React from "react";
export declare const useTooltip: (delay?: number) => {
    tooltipProps: {
        open: boolean;
        x: number | null;
        y: number | null;
        refs: ExtendedRefs<ReferenceType>;
        strategy: Strategy;
        getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    };
    getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>;
};
export interface TooltipProps {
    text?: string;
    open: boolean;
    x: number | null;
    y: number | null;
    refs: ExtendedRefs<ReferenceType>;
    strategy: Strategy;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
}
declare const Tooltip: {
    ({ text, open, x, y, refs, strategy, getFloatingProps }: TooltipProps): React.JSX.Element | null;
    displayName: string;
};
export default Tooltip;
