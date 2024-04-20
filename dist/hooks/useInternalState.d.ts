/// <reference types="react" />
declare const useInternalState: <T>(defaultValueProp: T, valueProp: T) => [T, import("react").Dispatch<import("react").SetStateAction<T>>];
export default useInternalState;
