import { tremorTwMerge } from "lib";
import React from "react";

interface NoDataProps {
  noDataText?: string;
}
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <div
      className={tremorTwMerge(
        // common
        "flex items-center justify-center w-full h-full border border-dashed rounded-tremor-default",
        // light
        "border-tremor-border",
        // dark
        "dark:border-dark-tremor-border",
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
