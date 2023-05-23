import { useState } from "react";

const useInternalState = <T,>(defaultValueProp: T, valueProp: T) => {
  const isControlled = valueProp !== undefined;
  const [valueState, setValueState] = useState(defaultValueProp);

  const value = isControlled ? valueProp : valueState;
  const setValue = (nextValue: T) => {
    if (isControlled) {
      return;
    }
    setValueState(nextValue);
  };

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useInternalState;
