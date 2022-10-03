import React from 'react';

import { SelectBox, SelectBoxItem } from 'components';
import { CalendarIcon } from 'assets';

const MyIcon = CalendarIcon;

export const SimpleSelectBox = (args: any) => (
    <SelectBox { ...args }>
        <SelectBoxItem
            value={ 5 }
            text={ 'Very Long DropdownItem Value as an edge case' }
            Icon={ MyIcon }
        />
        <SelectBoxItem value={ 3 } text={ 'Three' } Icon={ MyIcon } />
        <SelectBoxItem value={ 1 } text={ 'One' } Icon={ MyIcon } />
    </SelectBox>
);
