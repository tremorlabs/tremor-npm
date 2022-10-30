import React, { useEffect, useState } from 'react';

import { BaseColorTheme, colorTheme } from './colors';
import { BaseColors, DeltaTypes, Importances, Sizes } from './primitives';
import { Color, DeltaType, Importance, Size, ValueFormatter } from './inputTypes';

export const isBaseColor = (baseColor: Color): boolean => {
    return Object.values(BaseColors).includes(baseColor);
};

export const getColorTheme = (
    baseColor: Color | null | undefined,
    defaultColor: Color = BaseColors.Blue
): BaseColorTheme => {
    if (!baseColor || !isBaseColor(baseColor)) {
        return colorTheme[defaultColor];
    }
    return colorTheme[baseColor];
};

export const isValidSize = (size: Size): boolean => {
    return Object.values(Sizes).includes(size);
};

export const isValidDeltaType = (deltaType: DeltaType): boolean => {
    return Object.values(DeltaTypes).includes(deltaType);
};

export const isValidImportance = (importance: Importance): boolean => {
    return Object.values(Importances).includes(importance);
};

export const mapInputsToDeltaType = (deltaType: string, isIncreasePositive: boolean): string => {
    if (isIncreasePositive || deltaType===DeltaTypes.Unchanged) {
        return deltaType;
    }
    switch (deltaType) {
    case DeltaTypes.Increase:
        return DeltaTypes.Decrease;
    case DeltaTypes.ModerateIncrease:
        return DeltaTypes.ModerateDecrease;
    case DeltaTypes.Decrease:
        return DeltaTypes.Increase;
    case DeltaTypes.ModerateDecrease:
        return DeltaTypes.ModerateIncrease;
    }
    return '';
};

export const defaultValueFormatter: ValueFormatter = (value: number) => value.toString();

export const sumNumericArray = (arr: number[]) => arr.reduce((prefixSum, num) => prefixSum + num, 0);

export const removeValueFromArray = (value: any, array: any[]): any[] => {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

export const isValueInArray = (value: any, array: any[]): boolean => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
};

export const stringIsNumeric = (str: string|undefined): boolean => {
    return !isNaN(Number(str)) && (str!==undefined);
};

export const stringEndsWithNumber = (str: string): boolean => {
    return stringIsNumeric(str.split('-').pop());
};

export const constructValueToNameMapping = (
    children: React.ReactElement[] | React.ReactElement
): Map<string, string> => {
    const valueToNameMapping = new Map<string, string>();
    React.Children.map(children, (child) => {
        valueToNameMapping.set(child.props.value, child.props.text);
    });
    return valueToNameMapping;
};

export const getOptionNamesFromChildren = (children: React.ReactElement[] | React.ReactElement): string[] => (
    React.Children.map(children, (child) => {
        return String(child.props.text);
    })
);

export const getFilteredOptionNames = (searchQuery: string, allOptionNames: string[]) => {
    return searchQuery === ''
        ? allOptionNames
        : allOptionNames.filter((optionName: string) => {
            return optionName.toLowerCase().includes(searchQuery.toLowerCase());
        });
};

export const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: {(event: any): void}) => {
    useEffect(
        () => {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
};

export const useWindowSize = (handler: {(): void}, initialWindowSize?: number) => {
    const [windowSize, setWindowSize] = useState<undefined | number>(initialWindowSize);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
            handler();
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize]);
};
