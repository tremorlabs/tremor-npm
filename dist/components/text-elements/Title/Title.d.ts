import React from "react";
import { Color } from "../../../lib";
export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Title: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<HTMLParagraphElement>>;
export default Title;
