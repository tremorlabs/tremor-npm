import React, { useEffect, useRef, useState } from 'react';

import { Color } from '../../../lib';
import Legend from 'components/text-elements/Legend';
import { themeColorRange } from 'lib';

const ChartLegend = ({ payload }: any, colors: Color[] = themeColorRange,
    setLegendHeight: React.Dispatch<React.SetStateAction<number>>) => {
    const calculateHeight = (height: number|undefined) => (
        height
            ? Number(height) + 20 // 20px extra padding
            : 60 // default height
    );

    const legendRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(calculateHeight(undefined));
    useEffect(() => {
        setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
        setHeight(calculateHeight(height));
    }, []);
    return (
        <div ref={ legendRef } className="tr-flex tr-items-center tr-justify-end">
            <Legend
                categories={payload.map((entry: any) => entry.value)}
                colors={ colors }
            />
        </div>
    );
};

export default ChartLegend;
