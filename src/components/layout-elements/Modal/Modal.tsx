import React, { useEffect, useRef, useState } from 'react';

import {
    HorizontalPositions,
    border,
    borderRadius,
    boxShadow,
    classNames,
    defaultColors,
    exceedsViewPort,
    getColorVariantsFromColorThemeValue,
    spacing,
    useOnClickOutside,
    useWindowSize,
} from 'lib';
import { HorizontalPosition } from '../../../lib/inputTypes';

export interface ModalProps {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerRef: React.RefObject<HTMLElement>,
    width?: string,
    maxHeight?: string,
    anchor?: HorizontalPosition,
    children: React.ReactNode,
}

const Modal = ({
    showModal,
    setShowModal,
    triggerRef,
    width = 'tr-w-full',
    maxHeight = 'tr-max-h-72',
    anchor = HorizontalPositions.Left,
    children,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, (e) => {
        const isTriggerElem = triggerRef ? triggerRef.current?.contains(e.target) : false;
        if (!isTriggerElem) {
            setShowModal(false);
        }
    });

    const invisibleRef = useRef<HTMLDivElement>(null);
    const checkPositionExceeding: HorizontalPosition = anchor === HorizontalPositions.Left
        ? HorizontalPositions.Right
        : HorizontalPositions.Left;
    const [modalExceedsViewPort, setModalExceedsViewport] = useState(false);

    const windowSize = useWindowSize();
    useEffect(() => {
        setModalExceedsViewport(exceedsViewPort(invisibleRef, checkPositionExceeding));
    }, [windowSize]);

    return (
        <>
            <div
                ref={ modalRef }
                className={ classNames(
                    'tr-absolute -tr-bottom-2 tr-translate-y-full tr-z-10 tr-divide-y tr-overflow-y-auto',
                    !showModal ? 'tr-hidden' : '',
                    width,
                    maxHeight,
                    getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
                    getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
                    getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
                    ((anchor === HorizontalPositions.Left) && !modalExceedsViewPort)
                        ? spacing.none.left
                        : spacing.none.right,
                    spacing.twoXs.marginTop,
                    spacing.twoXs.marginBottom,
                    borderRadius.md.all,
                    border.sm.all,
                    boxShadow.lg,
                ) }
            >
                { children }
            </div>
            {/* Invisible div to dedect if modal exceeds viewport. The purpose of this invisible div is that the
                exceed-check can be made before the modal is being shown, hence no delay is being caused. */}
            <div
                ref={ invisibleRef }
                className={ classNames(
                    'tr-absolute',
                    width,
                    anchor === HorizontalPositions.Left ? spacing.none.left : spacing.none.right,
                ) }
            />
        </>
    );
};

export default Modal;
