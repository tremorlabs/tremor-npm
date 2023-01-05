import React from "react";

import { SelectBox, SelectBoxItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleSelectBox = (args: any) => (
  <SelectBox {...args}>
    <SelectBoxItem
      value={5}
      text={"Very Long DropdownItem Value as an edge case"}
      icon={MyIcon}
    />
    <SelectBoxItem value={3} text={"Three"} icon={MyIcon} />
    <SelectBoxItem value={1} text={"One"} icon={MyIcon} />
  </SelectBox>
);
