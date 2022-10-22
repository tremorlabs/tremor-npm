import React, { useRef, useState } from 'react';

import { ArrowDownHeadIcon } from 'assets';

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
    parseMarginTop,
    parseMaxWidth,
    sizing,
    spacing
} from 'lib';
import Modal from 'components/layout-elements/Modal';

export interface SelectBoxProps {
    defaultValue?: any,
    handleSelect?: { (value: any): void },
    placeholder?: string,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const SelectBox = ({
    defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    placeholder = 'Select...',
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: SelectBoxProps) => {
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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(defaultValue);
    const [inputText, setInputText] = useState(selectedItem ? valueToNameMapping[selectedItem] : '');

    const allOptionNames = getOptionNamesFromChildren(children);
    const filteredOptionNames = new Set(getFilteredOptionNames(searchQuery, allOptionNames));

    const handleSelectBoxItemClick = (value: any) => {
        setInputText(valueToNameMapping[value]);
        setSelectedItem(value);
        handleSelect(value);
        setShowModal(false);
    };

    return (
        <div ref={ dropdownRef } className={ classNames(
            'tremor-base tr-relative tr-w-full tr-min-w-[10rem]',
            parseMaxWidth(maxWidth),
            getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            parseMarginTop(marginTop),
            borderRadius.md.all,
            border.sm.all,
            boxShadow.sm,
        ) }>
            <input
                className={ classNames(
                    'input-elem tr-w-full focus:tr-ring-2 focus:tr-outline-0',
                    getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.ring).focusRingColor,
                    getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                    spacing.twoXl.paddingLeft,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    fontSize.sm,
                    fontWeight.md,
                    borderRadius.md.all,
                    border.none.all,
                    'placeholder:tr-text-gray-500',
                    'tr-pr-10' // avoid text overflow at arrow down icon
                ) }
                type="text"
                placeholder={ placeholder }
                value={ inputText }
                onChange={ (e) => { setSearchQuery(e.target.value); setInputText(e.target.value); } }
                onClick={ () => setShowModal(!showModal) }
            />
            <button
                type="button"
                className={ classNames(
                    'tr-absolute tr-top-1/2 -tr-translate-y-1/2',
                    'tr-m-0 tr-p-0',
                    spacing.twoXl.right,
                ) }
                onClick={ () => setShowModal(!showModal) }
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
            <Modal
                showModal={ filteredOptionNames.size === 0 ? false : showModal }
                setShowModal={ setShowModal }
                triggerRef={ dropdownRef }
            >
                { React.Children.map(children, (child) => {
                    if (filteredOptionNames.has(String(child.props.text))) {
                        return (
                            <>
                                { React.cloneElement(child, {
                                    privateProps: {
                                        handleSelectBoxItemClick: handleSelectBoxItemClick,
                                        isActive: selectedItem === child.props.value,
                                    }
                                }) }
                            </>
                        );
                    }
                    return null;
                }) }
            </Modal>
        </div>
    );
};

export default SelectBox;
