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
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // dummy windowsize listener to trigger useEffect on resize
    const [_windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
        setHeight(calculateHeight(height));
        
        return () => window.removeEventListener('resize', handleResize);
    }, [_windowSize]);
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
