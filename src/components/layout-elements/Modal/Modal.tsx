import React, { useEffect, useRef, useState } from 'react';

import { HorizontalPosition, Width } from '../../../lib/inputTypes';
import {
    HorizontalPositions,
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    getColorVariantsFromColorThemeValue,
    getPixelsFromTwClassName,
    parseWidth,
    spacing,
    useOnClickOutside,
    useWindowSize,
} from 'lib';

export interface ModalProps {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerButtonRef: React.RefObject<HTMLElement>,
    width?: Width,
    maxHeight?: string,
    anchorPosition?: HorizontalPosition,
    children: React.ReactNode,
}

const Modal = ({
    showModal,
    setShowModal,
    triggerButtonRef,
    width,
    maxHeight = 'tr-max-h-72',
    anchorPosition = HorizontalPositions.Left,
    children,
}: ModalProps) => {
    const checkModalExceedsWindow = (
        modalWidth: number,
    ): boolean => {
        if (!triggerButtonRef.current) {
            return false;
        }
        if (anchorPosition === HorizontalPositions.Left) {
            const modalBoundingRight = triggerButtonRef
                .current
                .getBoundingClientRect()
                .left + modalWidth;
            console.log(modalBoundingRight);
            const windowWidth = window.innerWidth;
            return windowWidth - modalBoundingRight < 0;
        }
        if (anchorPosition === HorizontalPositions.Right) {
            const modalBoundingLeft = triggerButtonRef
                .current
                .getBoundingClientRect()
                .right - modalWidth;
            return modalBoundingLeft < 0;
        }
        return false;
    };

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, (e) => {
        // Exclude click on trigger button (e.g. Dropdown Button) from outside click handler
        const isTriggerElem = triggerButtonRef ? triggerButtonRef.current?.contains(e.target) : false;
        if (!isTriggerElem) {
            setShowModal(false);
        }
    });

    const [modalExceedsWindow, setModalExceedsWindow] = useState(false);

    // Execute only when modal is of fixed size
    if (width !== undefined) {
        const widthInPixel = getPixelsFromTwClassName(width);
        useEffect(() => {
            setModalExceedsWindow(checkModalExceedsWindow(widthInPixel));
        }, [triggerButtonRef]);

        useWindowSize(
            () => setModalExceedsWindow(checkModalExceedsWindow(widthInPixel))
        );
    }

    const getAbsoluteSpacing = () => {
        if ((anchorPosition === HorizontalPositions.Left)) {
            if (!modalExceedsWindow) {
                return spacing.none.left;
            } else {
                return spacing.none.right;
            }
        }
        if ((anchorPosition === HorizontalPositions.Right)) {
            if (!modalExceedsWindow) {
                return spacing.none.right;
            } else {
                return spacing.none.left;
            }
        }
        return spacing.none.left;
    };

    return (
        showModal ? (
            <div
                ref={ modalRef }
                className={ classNames(
                    'tr-absolute -tr-bottom-2 tr-translate-y-full tr-z-10 tr-divide-y tr-overflow-y-auto',
                    width ? parseWidth(width) : 'tr-w-full',
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
                ) }
            >
                { children }
            </div>
        ) : null
    );
};

export default Modal;
