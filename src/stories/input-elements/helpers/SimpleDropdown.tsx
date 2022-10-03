import React from 'react';

import { Dropdown, DropdownItem } from 'components';
import { CalendarIcon } from 'assets';

const MyIcon = CalendarIcon;

export const SimpleDropdown = (args: any) => (
    <Dropdown { ...args }>
        <DropdownItem
            value={ 5 }
            text={ 'Very Long DropdownItem Value as an edge case' }
            Icon={ MyIcon }
        />
        <DropdownItem value={ 3 } text={ 'Three' } Icon={ MyIcon } />
        <DropdownItem value={ 1 } text={ 'One' } Icon={ MyIcon } />
    </Dropdown>
);
