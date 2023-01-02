import React, { useRef, useState } from 'react';

import { HoveredValueContext, SelectedValueContext } from 'contexts';

import { useInternalState, useSelectOnKeyDown } from 'hooks';

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from 'assets';

import { MarginTop, MaxWidth } from '../../../lib/inputTypes';
import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    getFilteredOptions,
    isValueInArray,
    parseMarginTop,
    parseMaxWidth,
    removeValueFromArray,
    sizing,
    spacing
} from 'lib';
import Modal from 'components/layout-elements/Modal';
import { MultiSelectBoxItemProps } from './MultiSelectBoxItem';

export interface MultiSelectBoxProps<T> {
    defaultValues?: T[] | null,
    values?: T[] | null,
    onValuesChange?: (values: T[]) => void,
    handleSelect?: (values: T[]) => void,
    placeholder?: string,
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const MultiSelectBox = <T,>({
    defaultValues,
    values,
    onValuesChange,
    handleSelect,
    placeholder = 'Select...',
    icon,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: MultiSelectBoxProps<T>) => {
    if (handleSelect !== undefined) {
        console.warn('DeprecationWarning: The `handleSelect` property will be depracated in the next major release. \
            Please use `onValueChange` instead.');
    }

    const Icon = icon;
    const dropdownRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedValues, setSelectedValues] = useInternalState(defaultValues, values);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedItems = selectedValues ?? [];
    const displayText = selectedItems.length !==0 ? `${selectedItems.length} Selected` : placeholder;
    const showResetButton = selectedItems.length > 0;

    const options = React.Children.map(children, (child: { props: MultiSelectBoxItemProps }) => ({ ...child.props }));
    const filteredOptions = getFilteredOptions(searchQuery, options);
    const filteredOptionTexts = new Set(filteredOptions.map(option => option.text));
    const filteredOptionValues = filteredOptions.map(option => option.value);

    const handleModalToggle = (show: boolean) =>  {
        setSearchQuery('');
        setShowModal(show);
    };

    const handleValuesChange = (value: T) => {
        let newSelectedItems = [];
        if (!isValueInArray(value, selectedItems)) {
            newSelectedItems = [...selectedItems, value];
        } else {
            newSelectedItems = [...removeValueFromArray(value, selectedItems!)];
        }
        setSelectedValues(newSelectedItems);
        onValuesChange?.(newSelectedItems);
        handleSelect?.(newSelectedItems);
    };

    const handleReset = () => {
        setSelectedValues([]);
        onValuesChange?.([]);
        handleSelect?.([]);
    };


    const [hoveredValue, handleKeyDown] = useSelectOnKeyDown(
        filteredOptionValues,
        handleValuesChange,
        showModal,
        setShowModal,
    );

    return (
        <div
            ref={ dropdownRef }
            className={ classNames(
                'tremor-base tr-relative tr-w-full tr-min-w-[10rem]',
                parseMarginTop(marginTop),
                parseMaxWidth(maxWidth),
                getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                borderRadius.md.all,
                border.sm.all,
                boxShadow.sm,
            ) }
            onKeyDown={ handleKeyDown }
        >
            <button
                type="button"
                className={ classNames(
                    'input-elem tr-flex tr-justify-between tr-items-center tr-w-full',
                    'focus:tr-ring-0 focus:tr-outline-0',
                    Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                ) }
                onClick={ () => handleModalToggle(!showModal) }
            >
                <div className="tr-flex tr-justify-start tr-items-center tr-truncate">
                    {
                        Icon ? (
                            <Icon
                                className={ classNames(
                                    'tr-shrink-0',
                                    sizing.lg.height,
                                    sizing.lg.width,
                                    getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                    spacing.lg.marginRight,
                                )}
                                aria-hidden="true"
                            />
                        ) : null
                    }
                    <p className={ classNames(
                        'text-elem tr-whitespace-nowrap tr-truncate',
                        fontSize.sm,
                        fontWeight.md,
                        selectedItems.length !==0
                            ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                            : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                    ) }>
                        { displayText }
                    </p>
                </div>
                <div className="tr-flex tr-items-center">
                    { showResetButton ? (
                        <div
                            role="button"
                            className={ classNames(spacing.xs.marginRight) }
                            onClick={ (e) => {
                                e.stopPropagation(); // prevent firing parent button
                                handleReset();
                            } }
                        >
                            <XCircleIcon 
                                className={ classNames(
                                    'tr-flex-none',
                                    sizing.md.height,
                                    sizing.md.width,
                                    getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                ) }
                                aria-hidden="true"
                            />
                        </div>
                    ) : null }
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
                </div>
            </button>
            <Modal
                showModal={ showModal }
                setShowModal={ handleModalToggle }
                triggerRef={ dropdownRef }
            >
                <div className={ classNames(
                    'tr-flex tr-items-center tr-w-full',
                    getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).bgColor,
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                ) }>
                    <span>
                        <SearchIcon className={ classNames(
                            'tr-flex-none',
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                            spacing.threeXs.negativeMarginLeft,
                            spacing.lg.marginRight,
                            sizing.md.height,
                            sizing.md.width,
                        ) } aria-hidden="true" />
                    </span>
                    <input
                        name="search"
                        type="input"
                        placeholder="Search"
                        className={ classNames(
                            'input-elem tr-w-full focus:tr-outline-none focus:tr-ring-none',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor,
                            spacing.sm.paddingTop,
                            spacing.sm.paddingBottom,
                            fontSize.sm,
                            fontWeight.md,
                        ) }
                        onChange={ (e) => setSearchQuery(e.target.value) }
                    />
                </div>
                <SelectedValueContext.Provider value={ {
                    selectedValue: selectedItems,
                    handleValueChange: handleValuesChange,
                } }>
                    <HoveredValueContext.Provider value={ { hoveredValue } }>
                        { React.Children.map(children, (child) => {
                            if (filteredOptionTexts.has(String(child.props.text))) {
                                return React.cloneElement(child);
                            }
                        }) }
                    </HoveredValueContext.Provider>
                </SelectedValueContext.Provider>
            </Modal>
        </div>
    );
};

export default MultiSelectBox;
