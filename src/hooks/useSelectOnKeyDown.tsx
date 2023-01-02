import { useEffect, useState } from 'react';

const useSelectOnKeyDown = <T, >(
    optionValues: T[],
    onValueChange: (value: T) => void,
    isFocused: boolean,
    handleFocusChange: (isFocused: boolean) => void,
) => {
    const BASE_HOVERED_IDX = -1;
    const [hoveredIdx, setHoveredIdx] = useState(BASE_HOVERED_IDX);

    useEffect(() => {
        if (!isFocused) {
            setHoveredIdx(BASE_HOVERED_IDX);
        }
    }, [isFocused]);

    const getHoveredValue = (hoveredIdx: number, optionValues: any[]) => {
        if (hoveredIdx < 0) return undefined;
        return optionValues.at(hoveredIdx);
    };
    
    const hoveredValue = getHoveredValue(hoveredIdx, optionValues);

    const getNextIdx = () => {
        const nextIdx = hoveredIdx + 1;
        return nextIdx < optionValues.length ? nextIdx : BASE_HOVERED_IDX;
    };

    const getPrevIdx = () => {
        const prevIdx = hoveredIdx - 1;
        return prevIdx >= BASE_HOVERED_IDX ? prevIdx : optionValues.length - 1;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isFocused) {
            return;
        }

        switch (e.key) {
        case 'ArrowUp': {
            e.preventDefault();
            setHoveredIdx(getPrevIdx());
            break;
        }
        case 'ArrowDown': {
            e.preventDefault();
            setHoveredIdx(getNextIdx());
            break;
        }
        case 'Enter': {
            e.preventDefault();
            if (hoveredValue) {
                onValueChange(hoveredValue);
            }
            break;
        }
        case 'Escape': {
            e.preventDefault();
            handleFocusChange(false);
            setHoveredIdx(BASE_HOVERED_IDX);
            break;
        }
        }
    };
    return [hoveredValue, handleKeyDown];
};

export default useSelectOnKeyDown;
