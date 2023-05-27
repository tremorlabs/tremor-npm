import React from "react";
import { Flex, Text } from "components";
import { twMerge } from "tailwind-merge";
import { DEFAULT_COLOR, colorPalette, getColorClassNames } from "lib";

interface NoDataProps {
  noDataText?: string;
}
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={twMerge(
        "w-full h-full border border-dashed",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).borderColor,
      )}
    >
      <Text>{noDataText}</Text>
    </Flex>
  );
};

export default NoData;
