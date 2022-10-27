import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArrowRightIcon } from 'assets';

import { BaseColors, Sizes as InputSizes } from 'lib/primitives';

import { Card, ColGrid, Flex, Title } from 'components';

import { Button } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/Button',
    component: Flex,
} as ComponentMeta<typeof Flex>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const MyIcon = ArrowRightIcon;

const SizesTemplate: ComponentStory<typeof Button> = () => (
    <Card>
        <ColGrid numCols={4} gapY="gap-y-2">
            {Object.values(InputSizes).map(size => (
                <>
                    <Button size={size} text="Button" />
                    <Button size={size} text="Button" icon={MyIcon} />
                    <Button size={size} text="Button" icon={MyIcon} iconPosition="right" />
                    <Button size={size} text="Button" importance="secondary" />
                </>
            ))}
        </ColGrid>
    </Card>
);

const ColorsTemplate: ComponentStory<typeof Button> = () => (
    <Card>
        <ColGrid numCols={3} numColsLg={6} gapY="gap-y-2">
            {Object.values(BaseColors).map(color => (
                <>
                    <Button color={color} text={color} />
                    <Button color={color} text={color} icon={MyIcon} />
                    <Button color={color} text={color} importance="secondary" />
                </>
            ))}
        </ColGrid>
    </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof Button> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Flex>
                    <Button { ...args } text="Button" icon={MyIcon} />
                    <Button { ...args } text="Button" icon={MyIcon} importance={ 'secondary' } />
                </Flex>
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Flex>
                <Button { ...args } text="Very Long Button Text" icon={MyIcon} />
                <Button { ...args } text="Very Long Button Text" icon={MyIcon} importance={ 'secondary' } />
            </Flex>
        </Card>
    </>
);

export const Sizes = SizesTemplate.bind({});

export const Colors = ColorsTemplate.bind({});

export const WithFlexParent = ResponsiveFlexTemplate.bind({});

export const WithDisabled = ResponsiveFlexTemplate.bind({});
WithDisabled.args = {
    disabled: true,
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
