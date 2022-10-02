import React from 'react';

import { Card, Metric, Text } from 'components';

export const SimpleCard = (args: any) => (
    <Card {...args}>
        <Metric>23,000</Metric>
        <Text>Sample Text</Text>
    </Card>
);
