import React from 'react';
import { render } from '@testing-library/react';

import SelectBox from 'components/input-elements/SelectBox/SelectBox';
import SelectBoxItem from 'components/input-elements/SelectBox/SelectBoxItem';

describe('SelectBox', () => {
    test('renders the SelectBox component with default props', () => {
        render(
            <SelectBox>
                <SelectBoxItem value={1} text="Option One" />
                <SelectBoxItem value={2} text="Option Two" />
                <SelectBoxItem value={3} text="Option Three" />
            </SelectBox>
        );
    });
});
