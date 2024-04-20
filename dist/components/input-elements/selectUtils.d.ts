import React from "react";
export interface SelectItemProps {
    value: string;
    children?: React.ReactNode;
}
export declare const getNodeText: (node: React.ReactElement) => string | React.ReactElement | undefined;
export declare function constructValueToNameMapping(children: React.ReactElement[] | React.ReactElement): Map<string, string>;
export declare function getFilteredOptions(searchQuery: string, children: React.ReactElement[]): React.ReactElement[];
export declare const getSelectButtonColors: (hasSelection: boolean, isDisabled: boolean, hasError?: boolean) => string;
export declare function hasValue<T>(value: T | null | undefined): boolean;
