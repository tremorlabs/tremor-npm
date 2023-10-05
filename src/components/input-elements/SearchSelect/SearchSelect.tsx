"use client";
import React, { useMemo, useState } from "react";
import { tremorTwMerge } from "lib";

import { border, makeClassName, sizing, spacing } from "lib";
import {
    constructValueToNameMapping,
    getFilteredOptions,
    getSelectButtonColors,
    hasValue,
} from "../selectUtils";
import { Combobox } from "@headlessui/react";
import { ArrowDownHeadIcon } from "assets";
import { useInternalState } from "hooks";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    name?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: React.ElementType | React.JSXElementConstructor<any>;
    required?: boolean;
    children: React.ReactElement[] | React.ReactElement;
}

const SearchSelect = React.forwardRef<HTMLInputElement, SearchSelectProps>((props, ref) => {
    const {
        defaultValue = "",
        value,
        onValueChange,
        placeholder = "Select...",
        disabled = false,
        icon,
        children,
        className,
        name,
        required,
        ...other
    } = props;
    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
    const [searchQuery, setSearchQuery] = useState("");

    const Icon = icon;
    const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);
    const filteredOptions = useMemo(
        () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
        [searchQuery, children],
    );

    return (
        <div
            className={tremorTwMerge(
                // common
                "w-full min-w-[10rem] relative text-tremor-default",
            )}
        >
            <select
                required={required}
                className={tremorTwMerge(
                    // common
                    "h-full w-full",
                    className,
                    "absolute left-0 top-0 z-0 opacity-0"
                )}
                value={selectedValue}
                onChange={(e) => {
                    e.preventDefault();
                }}
                name={name}
                disabled={disabled}
            >
                <option className="hidden" value="" disabled hidden>{placeholder}</option>
                {filteredOptions.map((child: any) => {
                    const value = child.props.value;
                    const name = child.props.children;
                    return <option className="hidden" key={value} value={value}>{name}</option>
                })}
            </select>
            <Combobox
                as="div"
                ref={ref}
                defaultValue={defaultValue}
                value={selectedValue}
                onChange={
                    ((value: string) => {
                        onValueChange?.(value);
                        setSelectedValue(value);
                    }) as any
                }
                disabled={disabled}
                className={tremorTwMerge(
                    // common
                    "w-full min-w-[10rem] relative text-tremor-default",
                    className,
                )}
                {...other}
            >
                {({ value }) => (
                    <>
                        <Combobox.Button className="w-full">
                            {Icon && (
                                <span
                                    className={tremorTwMerge(
                                        "absolute inset-y-0 left-0 flex items-center ml-px",
                                        spacing.md.paddingLeft,
                                    )}
                                >
                                    <Icon
                                        className={tremorTwMerge(
                                            makeSearchSelectClassName("Icon"),
                                            // common
                                            "flex-none",
                                            // light
                                            "text-tremor-content-subtle",
                                            // dark
                                            "dark:text-dark-tremor-content-subtle",
                                            sizing.lg.height,
                                            sizing.lg.width,
                                        )}
                                    />
                                </span>
                            )}

                            <Combobox.Input
                                className={tremorTwMerge(
                                    // common
                                    "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 text-tremor-default",
                                    // light
                                    "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                                    // dark
                                    "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                                    Icon ? "p-10 -ml-0.5" : spacing.lg.paddingLeft,
                                    spacing.fourXl.paddingRight,
                                    spacing.sm.paddingY,
                                    border.sm.all,
                                    disabled
                                        ? "placeholder:text-tremor-content-subtle dark:placeholder:text-tremor-content-subtle"
                                        : "placeholder:text-tremor-content dark:placeholder:text-tremor-content",
                                    getSelectButtonColors(hasValue(value), disabled),
                                )}
                                placeholder={placeholder}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
                            />
                            <div
                                className={tremorTwMerge(
                                    "absolute inset-y-0 right-0 flex items-center",
                                    spacing.md.paddingRight,
                                )}
                            >
                                <ArrowDownHeadIcon
                                    className={tremorTwMerge(
                                        makeSearchSelectClassName("arrowDownIcon"),
                                        // common
                                        "flex-none",
                                        // light
                                        "text-tremor-content-subtle",
                                        // dark
                                        "dark:text-dark-tremor-content-subtle",
                                        sizing.md.height,
                                        sizing.md.width,
                                    )}
                                />
                            </div>
                        </Combobox.Button>
                        {filteredOptions.length > 0 && (
                            <Combobox.Options
                                className={tremorTwMerge(
                                    // common
                                    "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none rounded-tremor-default text-tremor-default",
                                    // light
                                    "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                                    // dark
                                    "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                                    spacing.twoXs.marginTop,
                                    spacing.twoXs.marginBottom,
                                    border.sm.all,
                                )}
                            >
                                {filteredOptions}
                            </Combobox.Options>
                        )}
                    </>
                )}
            </Combobox>
        </div>
    );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
