import React from 'react';

import BaseComponentProps from '@common/BaseComponentInterface';

import { classNames, parseMarginTopClassNames, parseTextColorClassNames } from '@utils/classname-utils';

export interface MetricProps extends BaseComponentProps {
    value: string,
    name?: string,
    valueTextColor?: string,
    nameTextColor?: string,
}

<div className="py-3">
                                <p className="text-xs text-gray-600 flex-none truncate">
                                    Bowl with team
                                </p>
                                <p className="text-lg font-semibold text-gray-600 flex-none truncate">
                                    $45
                                </p>
                            </div>


const MetricSmall = ({
    value,
    name,
    valueTextColor = 'text-gray-600',
    nameTextColor = 'text-gray-600',
    marginTop
}: MetricProps) => {
    return(
        <div className={ classNames(parseMarginTopClassNames(marginTop)) }>
            { name ? (
                <p className={ classNames(
                    parseTextColorClassNames(nameTextColor),
                    // @Achi: flex-none logic?
                    'text-xs font-normal flex-none truncate'
                ) }>
                    { name }
                </p>
            ) : null}
            <p className={ classNames(
                parseTextColorClassNames(valueTextColor),
                // @Achi: flex-none logic?
                'text-lg shrink-0 font-semibold flex-none truncate'
            ) }
            >
                { value }
            </p>
        </div>
    );
};

export default MetricSmall;