import React, { useEffect, useRef, useState } from 'react';

import { ArrowDownHeadIcon } from 'assets';

import { useInternalState, useSelectOnKeyDown } from 'hooks';

import { HoveredValueContext, SelectedValueContext } from 'contexts';

import { MarginTop, MaxWidth } from '../../../lib/inputTypes';
import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    constructValueToNameMapping,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    getFilteredOptions,
    parseMarginTop,
    parseMaxWidth,
    sizing,
    spacing
} from 'lib';
import Modal from 'components/layout-elements/Modal';
import { SelectBoxItemProps } from './SelectBoxItem';

export interface SelectBoxProps<T> {
    defaultValue?: T,
    value?: T,
    onValueChange?: (value: T) => void,
    handleSelect?: (value: any) => void, // Deprecated
    placeholder?: string,
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const SelectBox = <T, >({
    defaultValue,
    value,
    onValueChange,
    handleSelect, // Deprecated
    placeholder = 'Select...',
    icon,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: SelectBoxProps<T>) => {
    if (handleSelect !== undefined) {
        console.warn('DeprecationWarning: The `handleSelect` property is deprecated and will be removed \
            in the next major release. Please use `onValueChange` instead.');
    }

    const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isSelectBoxHovered, setIsSelectBoxHovered] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const Icon = icon;
    const valueToNameMapping = constructValueToNameMapping(children);

    useEffect(() => {
        setInputValue(valueToNameMapping.get(selectedValue) || '');
    }, [selectedValue]);

    const options = React.Children.map(children, (child: { props: SelectBoxItemProps }) => ({ ...child.props }));

    const filteredOptions = getFilteredOptions(searchQuery, options);

    const filteredOptionTexts = new Set(filteredOptions.map(option => option.text));
    const filteredOptionValues = filteredOptions.map(option => option.value);

    const handleFocusChange = (isFocused: boolean) => {
        if (isFocused === false) {
            inputRef.current?.blur();
        }
        setIsFocused(isFocused);
    };

    const handleValueChange = (value: T) => {
        setSearchQuery('');
        setInputValue(valueToNameMapping.get(selectedValue) || '');
        handleFocusChange(false);
        setSelectedValue(value);
        inputRef.current?.blur();

        onValueChange?.(value);
        handleSelect?.(value);
    };

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setInputValue(e.target.value);
    };

    const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
        handleValueChange,
        filteredOptionValues,
        isFocused,
        handleFocusChange,
        selectedValue
    );

    return (
        <div
            ref={ dropdownRef }
            onClick={ () => handleFocusChange(!isFocused) }
            onKeyDown={ handleKeyDown }
            className={ classNames(
                'tremor-base tr-relative tr-w-full tr-min-w-[10rem]',
                parseMaxWidth(maxWidth),
                parseMarginTop(marginTop),
                !isSelectBoxHovered
                    ? getColorVariantsFromColorThemeValue(defaultColors.white).bgColor
                    : getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor,
                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                borderRadius.md.all,
                border.sm.all,
                boxShadow.sm,
            )}
            onMouseEnter={ () => setIsSelectBoxHovered(true) }
            onMouseLeave={ () => setIsSelectBoxHovered(false) }
        >
            <div className="tr-flex tr-items-center overflow-hidden">
                {
                    Icon ? (
                        <button
                            type="button"
                            className={ classNames('input-elem tr-p-0', spacing.xl.marginLeft) }
                        >
                            <Icon
                                className={ classNames(
                                    'tr-shrink-0 tr-bg-inherit',
                                    sizing.lg.height,
                                    sizing.lg.width,
                                    getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                )}
                                aria-hidden="true"
                            />
                        </button>
                    ) : null
                }
                <input
                    ref={ inputRef }
                    type="text"
                    className={ classNames(
                        'input-elem tr-w-full focus:tr-outline-0 focus:tr-ring-0 tr-bg-inherit',
                        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                        Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
                        spacing.sm.paddingTop,
                        spacing.sm.paddingBottom,
                        fontSize.sm,
                        fontWeight.md,
                        border.none.all,
                        'placeholder:tr-text-gray-500',
                        'tr-pr-10' // avoid text overflow at arrow down icon
                    ) }
                    placeholder={ placeholder }
                    value={ inputValue }
                    onChange={ handleInputValueChange }
                />
                <button
                    type="button"
                    className={ classNames(
                        'input-elem tr-absolute tr-top-1/2 -tr-translate-y-1/2 tr-bg-inherit',
                        spacing.twoXl.right,
                    ) }
                >
                    <ArrowDownHeadIcon
                        className={ classNames(
                            'tr-flex-none',
                            sizing.lg.height,
                            sizing.lg.width,
                            spacing.twoXs.negativeMarginRight,
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                        ) }
                        aria-hidden="true"
                    />
                </button>
            </div>
            <Modal
                showModal={ filteredOptions.length === 0 ? false : isFocused }
                setShowModal={ handleFocusChange }
                triggerRef={ dropdownRef }
            >
                <SelectedValueContext.Provider value={ { selectedValue, handleValueChange }}>
                    <HoveredValueContext.Provider value={ { hoveredValue } }>
                        { React.Children.map(children, (child) => {
                            if (filteredOptionTexts.has(String(child.props.text))) {
                                return React.cloneElement(child);
                            }
                            return null;
                        }) }
                    </HoveredValueContext.Provider>
                </SelectedValueContext.Provider>
            </Modal>
        </div>
    );
};

export default SelectBox;
