import React from "react";
import { Color } from "../../../lib";
export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Subtitle: React.ForwardRefExoticComponent<SubtitleProps & React.RefAttributes<HTMLParagraphElement>>;
export default Subtitle;
