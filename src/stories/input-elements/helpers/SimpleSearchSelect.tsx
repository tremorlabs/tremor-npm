import React from "react";

import { SearchSelect, SearchSelectItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleSearchSelect = (args: any) => (
  <SearchSelect {...args}>
    <SearchSelectItem value="5" icon={MyIcon}>
      Very Long DropdownItem Value as an edge case
    </SearchSelectItem>
    <SearchSelectItem value="Three" icon={MyIcon} />
    <SearchSelectItem value="1" icon={MyIcon}>
      One
    </SearchSelectItem>
  </SearchSelect>
);
