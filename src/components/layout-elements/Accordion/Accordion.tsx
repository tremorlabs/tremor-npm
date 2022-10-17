import React, { useState } from 'react';

import {
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    parseMarginTop
} from 'lib';
import { MarginTop } from '../../../lib';

export interface AccordionProps {
    shadow?: boolean,
    expanded?: boolean,
    marginTop?: MarginTop,
    children: React.ReactElement[] | React.ReactElement,
    privateProps?: {
        shapeClassNames: string,
    },
}

const Accordion = ({
    shadow,
    expanded = false,
    marginTop = 'mt-0',
    children,
    privateProps = {
        shapeClassNames: classNames(border.sm.all, borderRadius.lg.all),
    },
}: AccordionProps) => {

    const [isExpanded, setExpanded] = useState(expanded);

    return(
        <div className={ classNames(
            'tremor-base tr-overflow-hidden',
            parseMarginTop(marginTop),
            getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
            getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
            privateProps!.shapeClassNames,
            shadow ? boxShadow.md : '',
        ) }>
            { React.Children.map(children, (child, idx) => {
                if (idx===0) return (
                    <>
                        { React.cloneElement(child, {
                            privateProps: {
                                isExpanded: isExpanded,
                                setExpanded: setExpanded
                            } })
                        }
                    </>
                );

                return (
                    <div className={ isExpanded ? '' : 'tr-hidden' }>
                        { child }
                    </div>
                );
            }) }
        </div>  
    );
};

export default Accordion;
