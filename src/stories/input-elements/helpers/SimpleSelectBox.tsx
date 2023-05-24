import React from "react";

import { SelectBox, SelectBoxItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleSelectBox = (args: any) => (
  <SelectBox {...args}>
    <SelectBoxItem value="5" icon={MyIcon}>
      Very Long DropdownItem Value as an edge case
    </SelectBoxItem>
    <SelectBoxItem value="Three" icon={MyIcon} />
    <SelectBoxItem value="1" icon={MyIcon}>
      One
    </SelectBoxItem>
  </SelectBox>
);
