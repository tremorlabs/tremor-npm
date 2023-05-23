import { useEffect, useState } from "react";

const useSelectOnKeyDown = (
  onValueChange: (value: string) => void,
  optionValues: string[],
  isFocused: boolean,
  handleFocusChange: (isFocused: boolean) => void,
  value?: string,
): [
  string | null | undefined,
  (e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => void,
] => {
  const NO_SELECTION_IDX = -1;
  const [hoveredIdx, setHoveredIdx] = useState(NO_SELECTION_IDX);

  const getHoveredValue = (hoveredIdx: number, optionValues: string[]) => {
    if (hoveredIdx < 0) return undefined;
    return optionValues[hoveredIdx];
  };

  useEffect(() => {
    const getIndexOfSelectedValue = () => {
      if (!isFocused) {
        setHoveredIdx(NO_SELECTION_IDX);
      }
      if (!value) return NO_SELECTION_IDX;
      const indexOfValue = optionValues.indexOf(value);
      return indexOfValue === -1 ? NO_SELECTION_IDX : indexOfValue;
    };

    setHoveredIdx(getIndexOfSelectedValue());
  }, [value, isFocused]);

  const hoveredValue = getHoveredValue(hoveredIdx, optionValues);

  const getNextIdx = () => {
    const nextIdx = hoveredIdx + 1;
    return Math.min(nextIdx, optionValues.length - 1);
  };

  const getPrevIdx = () => {
    const prevIdx = hoveredIdx - 1;
    return Math.max(prevIdx, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (!isFocused) {
      return;
    }

    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setHoveredIdx(getPrevIdx());
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setHoveredIdx(getNextIdx());
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (hoveredValue) {
          onValueChange(hoveredValue);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        handleFocusChange(false);
        setHoveredIdx(NO_SELECTION_IDX);
        break;
      }
    }
  };
  return [hoveredValue, handleKeyDown];
};

export default useSelectOnKeyDown;
