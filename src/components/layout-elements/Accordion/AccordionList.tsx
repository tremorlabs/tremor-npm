import React from 'react';

import { border, borderRadius, boxShadow, classNames, parseMarginTop } from 'lib';
import { MarginTop } from '../../../lib';

export interface AccordionListProps {
    shadow?: boolean,
    marginTop?: MarginTop,
    children: React.ReactElement[] | React.ReactElement,
}

const AccordionList = ({
    shadow = true,
    marginTop = 'mt-0',
    children,
}: AccordionListProps) => {
    const numChildren = React.Children.count(children);

    return (
        <div className={ classNames(
            'tremor-base',
            parseMarginTop(marginTop),
            borderRadius.lg.all,
            shadow ? boxShadow.md : '',
        ) }>
            { React.Children.map(children, (child, idx) => {
                if (idx === 0) {
                    return (
                        <>
                            { React.cloneElement(child, {
                                privateProps: {
                                    shapeClassNames: classNames(
                                        borderRadius.lg.top,
                                        border.sm.left,
                                        border.sm.top,
                                        border.sm.right,
                                        border.sm.bottom,
                                        boxShadow.none,
                                    ),
                                },
                            }) }
                        </>
                    );
                }
                if (idx === numChildren - 1) {
                    return (
                        <>
                            { React.cloneElement(child, {
                                privateProps: {
                                    shapeClassNames: classNames(
                                        borderRadius.lg.bottom,
                                        border.sm.left,
                                        border.sm.right,
                                        border.sm.bottom,
                                        boxShadow.none,
                                    ),
                                },
                            }) }
                        </>
                    );
                }
                return (
                    <>
                        { React.cloneElement(child, { 
                            privateProps: {
                                shapeClassNames:  classNames(
                                    border.sm.left,
                                    border.sm.right,
                                    border.sm.bottom,
                                    boxShadow.none,
                                ),
                            },
                        }) }
                    </>
                );
            })}
        </div>
    );
};

export default AccordionList;
