import React from "react";

import { Select, SelectItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleSelect = (args: any) => (
  <Select {...args}>
    <SelectItem value={"5"} icon={MyIcon}>
      Very Long SelectItem Value as an edge case
    </SelectItem>
    <SelectItem value="3" icon={MyIcon}>
      Three
    </SelectItem>
    <SelectItem value={"1"} icon={MyIcon}>
      One
    </SelectItem>
  </Select>
);
