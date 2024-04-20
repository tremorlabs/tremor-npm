import React from "react";
import { Color } from "../../../lib/inputTypes";
export declare const makeTrackerClassName: (className: string) => string;
export interface TrackerBlockProps {
    key?: string | number;
    color?: Color | string;
    tooltip?: string;
}
export interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    data: TrackerBlockProps[];
}
declare const Tracker: React.ForwardRefExoticComponent<TrackerProps & React.RefAttributes<HTMLDivElement>>;
export default Tracker;
