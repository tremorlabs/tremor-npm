/// <reference types="react" />
export interface SelectedValueContextValue {
    selectedValue: any;
    handleValueChange?: (value: any) => void;
}
declare const SelectedValueContext: import("react").Context<SelectedValueContextValue>;
export default SelectedValueContext;
