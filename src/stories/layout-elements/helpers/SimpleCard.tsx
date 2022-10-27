import React from 'react';

import { BadgeDelta, ButtonInline, Card, Flex, Footer, Metric, Text } from 'components';

export const SimpleCard = (args: any) => (
    <Card {...args}>
        <Flex>
            <Metric>23,000</Metric>
            <BadgeDelta deltaType="increase" text="19.14%" />
        </Flex>
        <Text>Sample Text</Text>
        <Footer>
            <ButtonInline text="View more" />
        </Footer>
    </Card>
);
