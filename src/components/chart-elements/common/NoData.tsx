import React from "react";
import { Flex, Text } from "components";
import { tremorTwMerge } from "lib";

interface NoDataProps {
  noDataText?: string;
}
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={tremorTwMerge(
        "w-full h-full rounded-tremor-default border border-dashed border-tremor-border",
      )}
    >
      <Text className={tremorTwMerge("text-tremor-content")}>{noDataText}</Text>
    </Flex>
  );
};

export default NoData;
