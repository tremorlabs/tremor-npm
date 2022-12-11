import React, { useState } from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    BaseColors,
    border,
    borderRadius,
    boxShadow,
    classNames,
    colorTheme,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseMaxWidth,
    sizing,
    spacing
} from 'lib';
import { MarginTop, MaxWidth } from '../../../lib/inputTypes';
import { ExclamationFilledIcon } from 'assets';

export interface TextInputProps {
    defaultValue?: string,
    handleChange?: (value: string) => void,
    placeholder?: string,
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    error?: boolean,
    errorMessage?: string,
    maxWidth?: MaxWidth,
    marginTop?: MarginTop,
}

const TextInput = ({
    defaultValue = '',
    handleChange,
    placeholder = 'Type...',
    icon,
    error = false,
    errorMessage,
    maxWidth = 'max-w-none',
    marginTop = 'mt-0',
}: TextInputProps) => {
    const Icon = icon;

    const [inputValue, setInputValue] = useState<string>(defaultValue);

    const onChange = (e: any) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
        handleChange?.(newInputValue);
    };

    return (
        <div className={ classNames(
            'tr-relative tr-w-full tr-flex tr-items-center tr-overflow-hidden tr-min-w-[10rem]',
            parseMaxWidth(maxWidth),
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
            error
                ? getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].border).borderColor
                : getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
            borderRadius.md.all,
            border.sm.all,
            boxShadow.sm,
        ) }>
            {
                Icon ? (
                    <Icon
                        className={ classNames(
                            sizing.lg.height,
                            sizing.lg.width,
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                            spacing.twoXl.marginLeft,
                        )}
                        aria-hidden="true"
                    />
                ) : null
            }
            <input
                className={ classNames(
                    'tremor-base input-elem',
                    'tr-w-full focus:tr-outline-0 focus:tr-ring-0',
                    getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).hoverBgColor,
                    error
                        ? getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor
                        : getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                    Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
                    error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    fontSize.sm,
                    fontWeight.md,
                    border.none.all,
                    'placeholder:tr-text-gray-500',
                ) }
                value={ inputValue }
                onChange={ onChange }
                placeholder={ placeholder }
                type="text"
            />
            { error
                ? (
                    <Tooltip content={ errorMessage } className={ errorMessage ? '' : 'tr-hidden' }>
                        <div className={ classNames(spacing.twoXl.marginRight) }>
                            <ExclamationFilledIcon
                                className={ classNames(
                                    sizing.lg.height,
                                    sizing.lg.width,
                                    getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor,
                                )}
                                aria-hidden="true"
                            />
                        </div>
                    </Tooltip>
                )
                : null }
        </div>
    );
};

export default TextInput;
