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

export interface DropdownProps {
    defaultValue?: any,
    handleSelect?: { (value: any): void },
    placeholder?: string,
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const Dropdown = ({
    defaultValue,
    handleSelect = (value: any) => { value; },
    placeholder = 'Select...',
    icon,
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: DropdownProps) => {
    const Icon = icon;

    const dropdownRef = useRef(null);

    const constructValueToNameMapping = (): Map<string, string> => {
        const valueToNameMapping = new Map<string, string>();
        React.Children.map(children, (child) => {
            valueToNameMapping.set(child.props.value, child.props.text);
        });
        return valueToNameMapping;
    };

    const valueToNameMapping = constructValueToNameMapping();

    const [selectedItem, setSelectedItem] = useState(defaultValue);
    const [showModal, setShowModal] = useState(false);

    const handleDropdownItemClick = (value: any) => {
        setSelectedItem(value);
        handleSelect(value);
        setShowModal(false);
    };

    return(
        <div
            ref={ dropdownRef }
            className={ classNames(
                'tremor-base tr-relative tr-w-full tr-min-w-[10rem]',
                parseMaxWidth(maxWidth),
                getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
                parseMarginTop(marginTop),
                borderRadius.md.all,
                border.sm.all,
                boxShadow.sm,
            ) }
        >
            <button
                type="button"
                className={ classNames(
                    'input-elem tr-flex tr-justify-between tr-items-center tr-w-full',
                    'focus:tr-outline-0 focus:tr-ring-0',
                    Icon ? spacing.xl.paddingLeft : spacing.twoXl.paddingLeft,
                    spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                ) }
                onClick={ () => setShowModal(!showModal) }
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
                        selectedItem
                            ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                            : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                    ) }>
                        { selectedItem ? valueToNameMapping.get(selectedItem) : placeholder }
                    </p>
                </div>
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
                showModal={ showModal }
                setShowModal={ setShowModal }
                triggerRef={ dropdownRef }
            >
                { React.Children.map(children, (child: React.ReactElement) => (
                    <>
                        { React.cloneElement(child, {
                            privateProps: {
                                handleDropdownItemClick,
                                isActive: child?.props.value === selectedItem,
                            },
                        }) }
                    </>
                )) }
            </Modal>
        </div>
    );
};

export default Dropdown;
