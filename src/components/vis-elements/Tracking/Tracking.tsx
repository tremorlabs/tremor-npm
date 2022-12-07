import React from 'react';

import { classNames, parseMarginTop, spacing } from 'lib';
import TremorBaseProps from '../../../lib/TremorBaseProps';

export interface TrackingProps extends TremorBaseProps {
    children: React.ReactNode,
}

const Tracking = ({
    marginTop = 'mt-0',
    className = '',
    children
}: TrackingProps) => {
    return(
        <div className={ classNames(
            'tremor-base tr-w-full tr-flex tr-items-center',
            parseMarginTop(marginTop),
            spacing.threeXs.spaceX,
            className,
        ) }>
            { children }
        </div>
    );
};

export default Tracking;
