import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { useOnClickOutside, useOnWindowResize } from "hooks";

import { HorizontalPosition, Width } from "../../../lib/inputTypes";
import {
  HorizontalPositions,
  border,
  borderRadius,
  boxShadow,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  getPixelsFromTwClassName,
  parseWidth,
  spacing,
} from "lib";

export interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | ((nextState: boolean) => void);
  triggerRef: React.RefObject<HTMLElement>;
  width?: Width;
  maxHeight?: string;
  anchorPosition?: HorizontalPosition;
  children: React.ReactNode;
}

const Modal = ({
  showModal,
  setShowModal,
  triggerRef,
  width,
  maxHeight = "max-h-72",
  anchorPosition = HorizontalPositions.Left,
  children,
}: ModalProps) => {
  const [modalExceedsWindow, setModalExceedsWindow] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const checkModalExceedsWindow = (modalWidth: number, windowWidth: number): boolean => {
    if (!triggerRef.current) {
      return false;
    }
    if (anchorPosition === HorizontalPositions.Left) {
      const modalBoundingRight = triggerRef.current.getBoundingClientRect().left + modalWidth;
      return windowWidth - modalBoundingRight < 0;
    }
    if (anchorPosition === HorizontalPositions.Right) {
      const modalBoundingLeft = triggerRef.current.getBoundingClientRect().right - modalWidth;
      return modalBoundingLeft < 0;
    }
    return false;
  };

  const getAbsoluteSpacing = () => {
    if (anchorPosition === HorizontalPositions.Left) {
      if (!modalExceedsWindow) {
        return spacing.none.left;
      } else {
        return spacing.none.right;
      }
    }
    if (anchorPosition === HorizontalPositions.Right) {
      if (!modalExceedsWindow) {
        return spacing.none.right;
      } else {
        return spacing.none.left;
      }
    }
    return spacing.none.left;
  };

  useOnClickOutside(modalRef, (e) => {
    // Exclude click on trigger button (e.g. Dropdown Button) from outside click handler
    const isTriggerElem = triggerRef ? triggerRef.current?.contains(e.target) : false;
    if (!isTriggerElem) {
      setShowModal(false);
    }
  });

  // Execute only when modal is of absolute size
  if (width !== undefined) {
    const widthInPixel = getPixelsFromTwClassName(width);
    useEffect(() => {
      setModalExceedsWindow(checkModalExceedsWindow(widthInPixel, window.innerWidth));
    }, [triggerRef]);

    useOnWindowResize(() =>
      setModalExceedsWindow(checkModalExceedsWindow(widthInPixel, window.innerWidth)),
    );
  }

  return showModal ? (
    <div
      ref={modalRef}
      className={clsx(
        "absolute z-10 divide-y overflow-y-auto",
        width ? parseWidth(width) : "w-full",
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
      )}
    >
      {children}
    </div>
  ) : null;
};

export default Modal;
