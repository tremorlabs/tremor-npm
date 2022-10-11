import React from 'react';
import { render } from '@testing-library/react';

import Tab from 'components/input-elements/Tab/Tab';
import TabList from 'components/input-elements/Tab/TabList';

describe('SelectBox', () => {
    test('renders the SelectBox component with default props', () => {
        render(
            <TabList>
                <Tab value={1} name="Option One" />
                <Tab value={2} name="Option Two" />
                <Tab value={3} name="Option Three" />
            </TabList>
        );
    });
});
