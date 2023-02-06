import React from "react";
import clsx from "clsx";

import { parseMarginTop, spacing } from "lib";
import { MarginTop } from "../../../lib";

export interface TrackingProps {
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const Tracking = ({ marginTop = "mt-0", children }: TrackingProps) => {
  return (
    <div
      className={clsx(
        "tremor-base tr-w-full tr-flex tr-items-center",
        parseMarginTop(marginTop),
        spacing.threeXs.spaceX,
      )}
    >
      {children}
    </div>
  );
};

export default Tracking;
