import React from "react";
interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    icon: React.ElementType;
}
export declare const NavButton: ({ onClick, icon, ...other }: NavButtonProps) => React.JSX.Element;
export {};
