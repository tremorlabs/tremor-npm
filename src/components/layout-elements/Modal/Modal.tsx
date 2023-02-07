import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { useOnClickOutside, useOnWindowResize } from "hooks";

import { HorizontalPosition } from "../../../lib/inputTypes";
import {
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  mergeRefs,
  spacing,
} from "lib";

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
    maxHeight = "max-h-72",
    children,
    className,
    ...other
  } = props;
  const [modalExceedsWindow, setModalExceedsWindow] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const checkModalExceedsWindow = (modalWidth: number, windowWidth: number): boolean => {
    if (!parentRef.current) {
      return false;
    }
    const modalBoundingRight = parentRef.current.getBoundingClientRect().left + modalWidth;
    return windowWidth - modalBoundingRight < 0;
  };

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
  if (width !== undefined) {
    useEffect(() => {
      setModalExceedsWindow(checkModalExceedsWindow(width, window.innerWidth));
    }, [parentRef]);

    useOnWindowResize(() =>
      setModalExceedsWindow(checkModalExceedsWindow(width, window.innerWidth)),
    );
  }

  return showModal ? (
    <div
      ref={mergeRefs([modalRef, ref])}
      className={clsx(
        "absolute z-10 divide-y overflow-y-auto",
        "w-full",
        getAbsoluteSpacing(),
        maxHeight,
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
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
