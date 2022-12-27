import { useState } from 'react';

export function useInternalState<T>(defaultValueProp: T, valueProp: T) {
    const [valueState, setValueState] = useState(defaultValueProp);

    const isControlled = valueProp !== undefined;
    
    const value = isControlled ? valueProp : valueState;
    const setValue = (nextValue: T) => {
        if (isControlled) {
            return;
        }
        setValueState(nextValue);
    };

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
