import React, { useEffect, useRef, useState } from 'react';

import { Color } from '../../../lib';
import Legend from 'components/text-elements/Legend';
import { useWindowSize } from 'lib';

const ChartLegend = (
    { payload }: any,
    categoryColors: Map<string, Color>,
    setLegendHeight: React.Dispatch<React.SetStateAction<number>>) => {
    const calculateHeight = (height: number|undefined) => (
        height
            ? Number(height) + 20 // 20px extra padding
            : 60 // default height
    );

    const legendRef = useRef<HTMLDivElement>(null);
    const [currentheight, setCurrentHeight] = useState(calculateHeight(undefined));
    
    useEffect(() => {
        setCurrentHeight(calculateHeight(currentheight));
        // setLegendHeight setState action from Chart parent
        setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
    }, []);

    useWindowSize(() => {
        setCurrentHeight(calculateHeight(currentheight));
        // setLegendHeight setState action from Chart parent
        setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
    });

    return (
        <div ref={ legendRef } className="tr-flex tr-items-center tr-justify-end">
            <Legend
                categories={ payload.map((entry: any) => entry.value) }
                colors={ payload.map((entry: any) => categoryColors.get(entry.value)) }
            />
        </div>
    );
};

export default ChartLegend;
