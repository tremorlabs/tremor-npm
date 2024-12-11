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
        // common
        "rounded-tremor-default flex h-full w-full items-center justify-center border border-dashed",
        // light
        "border-tremor-border",
        // dark
        "dark:border-dark-tremor-border",
        className,
      )}
    >
      <p
        className={tremorTwMerge(
          // light
          "text-tremor-content text-tremor-default",
          // dark
          "dark:text-dark-tremor-content",
        )}
      >
        {noDataText}
      </p>
    </div>
  );
};

export default NoData;
