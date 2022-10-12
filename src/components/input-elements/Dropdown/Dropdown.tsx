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
    placeholder?: string,
    defaultValue?: any,
    handleSelect?: { (value: any): void },
    marginTop?: MarginTop,
    maxWidth?: MaxWidth,
    children: React.ReactElement[] | React.ReactElement,
}

const Dropwdown = ({
    placeholder = 'Select...',
    defaultValue,
    handleSelect = (value: any) => { value; },
    marginTop = 'mt-0',
    maxWidth = 'max-w-none',
    children,
}: DropdownProps) => {
    const dropdownRef = useRef(null);

    type ValueToNameMapping = {
        [value: string]: string
    }
    const valueToNameMapping: ValueToNameMapping = {};
    const consturctValueToNameMapping = () => {
        React.Children.map(children, (child) => {
            valueToNameMapping[child.props.value] = child.props.text;
        });
    };
    consturctValueToNameMapping();

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
                    selectedItem
                        ? getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor
                        : getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
                ) }>
                    { selectedItem ? valueToNameMapping[selectedItem] : placeholder }
                </p>
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

export default Dropwdown;
