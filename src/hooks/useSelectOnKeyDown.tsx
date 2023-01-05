import { useEffect, useState } from "react";

const useSelectOnKeyDown = <T,>(
  onValueChange: (value: T) => void,
  optionValues: T[],
  isFocused: boolean,
  handleFocusChange: (isFocused: boolean) => void,
  value?: T
): [
  T | undefined,
  (e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => void
] => {
  const BASE_HOVERED_IDX = -1;
  const [hoveredIdx, setHoveredIdx] = useState(BASE_HOVERED_IDX);

  const getHoveredValue = (hoveredIdx: number, optionValues: T[]) => {
    if (hoveredIdx < 0) return undefined;
    return optionValues.at(hoveredIdx);
  };

  const getIndexOfSelectedValue = () => {
    if (!value) return BASE_HOVERED_IDX;
    const indexOfValue = optionValues.indexOf(value);
    return indexOfValue === -1 ? BASE_HOVERED_IDX : indexOfValue;
  };

  useEffect(() => {
    if (!isFocused) {
      setHoveredIdx(getIndexOfSelectedValue());
    }
  }, [isFocused]);

  const hoveredValue = getHoveredValue(hoveredIdx, optionValues);

  const getNextIdx = () => {
    const nextIdx = hoveredIdx + 1;
    return Math.min(nextIdx, optionValues.length - 1);
  };

  const getPrevIdx = () => {
    const prevIdx = hoveredIdx - 1;
    return Math.max(prevIdx, 0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
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
        setHoveredIdx(BASE_HOVERED_IDX);
        break;
      }
    }
  };
  return [hoveredValue, handleKeyDown];
};

export default useSelectOnKeyDown;
