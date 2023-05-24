import React from "react";

import { Dropdown, DropdownItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleDropdown = (args: any) => (
  <Dropdown {...args}>
    <DropdownItem value={"5"} icon={MyIcon}>
      Very Long DropdownItem Value as an edge case
    </DropdownItem>
    <DropdownItem value="3" icon={MyIcon}>
      Three
    </DropdownItem>
    <DropdownItem value={"1"} icon={MyIcon}>
      One
    </DropdownItem>
  </Dropdown>
);
