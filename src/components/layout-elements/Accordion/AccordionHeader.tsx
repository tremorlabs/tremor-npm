import React from 'react';

import { ArrowDownHeadIcon, ArrowUpHeadIcon } from 'assets';
import { classNames, defaultColors, getColorVariantsFromColorThemeValue, sizing, spacing } from 'lib';

export interface AccordionHeaderProps {
    privateProps?: {
        isExpanded: boolean,
        setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    }
    children: React.ReactNode;
}

const AccordionHeader = ({
    privateProps,
    children
}: AccordionHeaderProps) => {
    return(
        <button
            className={ classNames(
                'input-elem tr-w-full tr-flex tr-items-center tr-justify-between',
                spacing.threeXl.paddingLeft,
                spacing.threeXl.paddingRight,
                spacing.lg.paddingTop,
                spacing.lg.paddingBottom,
            ) }
            onClick={ () => privateProps!.setExpanded(!privateProps!.isExpanded) }
        >
            <div className={ classNames(
                'tr-flex tr-flex-1',
                spacing.threeXl.marginRight,
            ) }>
                { children }
            </div>
            <div>
                { privateProps!.isExpanded
                    ? (
                        <ArrowUpHeadIcon
                            className={ classNames(
                                getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                spacing.twoXs.negativeMarginRight,
                                sizing.xl.height,
                                sizing.xl.width,
                            ) }
                        />
                    )
                    : (
                        <ArrowDownHeadIcon
                            className={ classNames(
                                getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                                spacing.twoXs.negativeMarginRight,
                                sizing.xl.height,
                                sizing.xl.width,
                            ) }
                        />
                    ) }
            </div>
        </button>
    );
};

export default AccordionHeader;
