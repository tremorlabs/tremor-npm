import React from "react";
import { Color, HorizontalPosition, VerticalPosition } from "lib";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    decoration?: HorizontalPosition | VerticalPosition | "";
    decorationColor?: Color;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
export default Card;
