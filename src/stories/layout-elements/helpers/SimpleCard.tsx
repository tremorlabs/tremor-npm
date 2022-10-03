import React from 'react';

import { ButtonInline, Card, Footer, Metric, Text } from 'components';

export const SimpleCard = (args: any) => (
    <Card {...args}>
        <Metric>23,000</Metric>
        <Text>Sample Text</Text>
        <Footer>
            <ButtonInline text="View more" />
        </Footer>
    </Card>
);
