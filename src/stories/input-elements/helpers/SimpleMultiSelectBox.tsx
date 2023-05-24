import React from "react";

import { MultiSelectBox, MultiSelectBoxItem } from "components";

export const SimpleMultiSelectBox = (args: any) => (
  <MultiSelectBox {...args}>
    <MultiSelectBoxItem value={"5"}>
      Very Long DropdownItem Value as an edge case
    </MultiSelectBoxItem>
    <MultiSelectBoxItem value="Three" />
    <MultiSelectBoxItem value={"1"}>One</MultiSelectBoxItem>
  </MultiSelectBox>
);
