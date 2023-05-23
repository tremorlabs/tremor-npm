import React from "react";
import { Flex, Text } from "components";

type NoDataProps = {
  noDataText?: string;
};
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <Flex alignItems="center" justifyContent="center" className="w-full h-full">
      <Text>{noDataText}</Text>
    </Flex>
  );
};

export default NoData;
