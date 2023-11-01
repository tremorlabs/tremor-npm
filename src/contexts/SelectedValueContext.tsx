import { createContext } from "react";

export interface SelectedValueContextValue {
  selectedValue: any;
  handleValueChange?: (value: any) => void;
}

const SelectedValueContext = createContext<SelectedValueContextValue>({
  selectedValue: undefined,
  handleValueChange: undefined,
});

export default SelectedValueContext;
