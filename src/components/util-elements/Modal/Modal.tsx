import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useOnClickOutside, useOnWindowResize } from "hooks";

import { HorizontalPosition } from "../../../lib/inputTypes";
import { border, borderRadius, boxShadow, getColorClassNames, mergeRefs, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | ((nextState: boolean) => void);
  parentRef: React.RefObject<HTMLElement>;
  width?: number;
  maxHeight?: string;
  anchorPosition?: HorizontalPosition;
  children: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    showModal,
    setShowModal,
    parentRef,
    width,
    maxHeight = "max-h-[228px]",
    children,
    className,
    ...other
  } = props;
  const [modalExceedsWindow, setModalExceedsWindow] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const checkModalExceedsWindow = useCallback(
    (modalWidth: number, windowWidth: number): boolean => {
      if (!parentRef.current) {
        return false;
      }
      const modalBoundingRight = parentRef.current.getBoundingClientRect().left + modalWidth;
      return windowWidth - modalBoundingRight < 0;
    },
    [parentRef],
  );

  const getAbsoluteSpacing = () => {
    if (!modalExceedsWindow) {
      return spacing.none.left;
    }
    return spacing.none.right;
  };

  useOnClickOutside(modalRef, (e) => {
    // Exclude click on trigger button (e.g. Dropdown Button) from outside click handler
    const isTriggerElem = parentRef ? parentRef.current?.contains(e.target) : false;
    if (!isTriggerElem) {
      setShowModal(false);
    }
  });

  // Execute only when modal is of absolute size
  useEffect(() => {
    if (width) {
      setModalExceedsWindow(checkModalExceedsWindow(width, window.innerWidth));
    }
  }, [checkModalExceedsWindow, parentRef, width]);

  useOnWindowResize(() => {
    if (width) {
      setModalExceedsWindow(checkModalExceedsWindow(width, window.innerWidth));
    }
  });

  return showModal ? (
    <div
      ref={mergeRefs([modalRef, ref])}
      className={twMerge(
        "absolute z-10 divide-y overflow-y-scroll",
        width ? "" : "w-full",
        getAbsoluteSpacing(),
        maxHeight,
        getColorClassNames("white").bgColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).divideColor,
        spacing.twoXs.marginTop,
        spacing.twoXs.marginBottom,
        borderRadius.md.all,
        border.sm.all,
        boxShadow.lg,
        className,
      )}
      style={{ width }}
      {...other}
    >
      {children}
    </div>
  ) : null;
});

export default Modal;
