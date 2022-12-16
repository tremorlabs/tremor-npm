import React, { useRef, useState } from 'react';

import { ArrowDownHeadIcon } from 'assets';

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
    getFilteredOptionNames,
    getOptionNamesFromChildren,
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
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const SelectBox = ({
    defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect = (value) => null,
    placeholder = 'Select...',
    icon,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: SelectBoxProps) => {
    const Icon = icon;
    const dropdownRef = useRef(null);

    const valueToNameMapping = constructValueToNameMapping(children);

    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(defaultValue);
    const [inputText, setInputText] = useState(selectedItem ? valueToNameMapping.get(selectedItem) : '');
    const [isSelectBoxHovered, setIsSelectBoxHovered] = useState(false);

    const allOptionNames = getOptionNamesFromChildren(children);
    const filteredOptionNames = new Set(getFilteredOptionNames(searchQuery, allOptionNames));

    const handleSelectBoxItemClick = (value: any) => {
        setInputText(valueToNameMapping.get(value));
        setSelectedItem(value);
        handleSelect(value);
        setShowModal(false);
    };

    return (
        <div
            ref={ dropdownRef }
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
                            onClick={ () => setShowModal(!showModal) }
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
                    type="text"
                    placeholder={ placeholder }
                    value={ inputText }
                    onChange={ (e) => { setSearchQuery(e.target.value); setInputText(e.target.value); } }
                    onClick={ () => setShowModal(!showModal) }
                />
                <button
                    type="button"
                    className={ classNames(
                        'input-elem tr-absolute tr-top-1/2 -tr-translate-y-1/2 tr-bg-inherit',
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
            </div>
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
