import React from "react";
import { Color } from "../../../lib/inputTypes";
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLParagraphElement>>;
export default Text;
