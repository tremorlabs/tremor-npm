import React from "react";

import { MultiSelectBox, MultiSelectBoxItem } from "components";

export const SimpleMultiSelectBox = (args: any) => (
  <MultiSelectBox {...args}>
    <MultiSelectBoxItem
      value={5}
      text={"Very Long DropdownItem Value as an edge case"}
    />
    <MultiSelectBoxItem value={3} text={"Three"} />
    <MultiSelectBoxItem value={1} text={"One"} />
  </MultiSelectBox>
);
