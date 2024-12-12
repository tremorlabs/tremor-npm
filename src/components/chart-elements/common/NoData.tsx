import { tremorTwMerge } from "lib";
import React from "react";

interface NoDataProps {
  noDataText?: string;
  className?: string;
}
const NoData = ({ className, noDataText = "No data" }: NoDataProps) => {
  return (
    <div
      className={tremorTwMerge(
        "rounded-tremor-default border-tremor-border-default flex h-full w-full items-center justify-center border border-dashed",
        className,
      )}
    >
      <p className={tremorTwMerge("text-tremor-content-default text-tremor-default")}>
        {noDataText}
      </p>
    </div>
  );
};

export default NoData;
