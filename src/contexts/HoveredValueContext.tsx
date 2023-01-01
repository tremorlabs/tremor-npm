import { Dispatch, SetStateAction, createContext } from 'react';

export interface HoveredValueContextValue {
    hoveredValue: any | undefined;
    setHoveredValue?: Dispatch<SetStateAction<any>>;
}

const HoveredValueContext = createContext<HoveredValueContextValue>({
    hoveredValue: undefined,
});

export default HoveredValueContext;
