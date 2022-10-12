import React, { useEffect, useRef, useState } from 'react';

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
    isValueInArray,
    parseMarginTop,
    parseMaxWidth,
    removeValueFromArray,
    sizing,
    spacing
} from 'lib';
import Modal from 'components/layout-elements/Modal';

export interface MultiSelectBoxProps {
    defaultValues?: any[],
    handleSelect?: { (value: any): void },
    placeholder?: string,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const MultiSelectBox = ({
    defaultValues = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    placeholder = 'Select...',
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: MultiSelectBoxProps) => {
    const dropdownRef = useRef(null);

    const valueToNameMapping: {[value: string]: string} = {};
    const consturctValueToNameMapping = () => {
        React.Children.map(children, (child) => {
            valueToNameMapping[child.props.value] = child.props.text;
        });
    };
    consturctValueToNameMapping();

    const getOptionNamesFromChildren = (children: React.ReactElement[] | React.ReactElement): string[] => (
        React.Children.map(children, (child) => {
            return String(child.props.text);
        })
    );

    const getFilteredOptionNames = (searchQuery: string, allOptionNames: string[]) => {
        return searchQuery === ''
            ? allOptionNames
            : allOptionNames.filter((optionName: string) => {
                return optionName.toLowerCase().includes(searchQuery.toLowerCase());
            });
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState(defaultValues);
    const [searchQuery, setSearchQuery] = useState('');

    const allOptionNames = getOptionNamesFromChildren(children);
    const filteredOptionNames = new Set(getFilteredOptionNames(searchQuery, allOptionNames));

    useEffect(() => {
        setSearchQuery(''); // clear search query on modal close
    }, [selectedItems]);

    const handleMultiSelectBoxItemClick = (value: any) => {
        let newSelectedItems = [];
        if (!isValueInArray(value, selectedItems)) {
            newSelectedItems = [...selectedItems, value];
            setSelectedItems!([...newSelectedItems]);
        } else {
            newSelectedItems = removeValueFromArray(value, selectedItems!);
            setSelectedItems!([...newSelectedItems!]);
        }
        handleSelect(newSelectedItems);
    };

    const resetSelection = () => {
        setSelectedItems([]);
        handleSelect([]);
    };

    return (
        <div
            ref={ dropdownRef }
            className={ classNames(
                'tr-relative tr-w-full tr-min-w-[10rem]',
                parseMaxWidth(maxWidth),
                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                parseMarginTop(marginTop),
                borderRadius.md.all,
                border.sm.all,
                boxShadow.sm,
            ) }
        >
            <button
                className={ classNames(
                    'tr-flex tr-justify-between tr-items-center tr-w-full',
                    'focus:tr-ring-2 focus:tr-outline-0',
                    getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
                    spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    borderRadius.md.all,
                ) }
                onClick={ () => setShowModal(!showModal) }
            >
                <p className={ classNames(
                    'tr-whitespace-nowrap tr-truncate',
                    fontSize.sm,
                    fontWeight.md,
                    selectedItems.length !==0
                        ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                        : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                ) }>
                    { selectedItems.length !==0 ? `${selectedItems.length} Selected` : placeholder }
                </p>
                <div className="tr-flex tr-items-center">
                    { selectedItems.length !== 0 ? (
                        <div
                            role="button"
                            className={ classNames(spacing.xs.marginRight) }
                            onClick={ (e) => {
                                e.stopPropagation(); // prevent firing parent button
                                resetSelection();
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
                setShowModal={ setShowModal }
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
                            'tr-w-full focus:tr-outline-none focus:tr-ring-none',
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
                { React.Children.map(children, (child) => {
                    if (filteredOptionNames.has(String(child.props.text))) {
                        return (
                            <>
                                { React.cloneElement(child, {
                                    privateProps: {
                                        handleMultiSelectBoxItemClick,
                                        isActive: isValueInArray(child.props.value, selectedItems),
                                    }
                                }) }
                            </>
                        );
                    }
                }) }
            </Modal>
        </div>
    );
};

export default MultiSelectBox;
