import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArrowRightIcon } from 'assets';

import { BaseColors, Sizes as InputSizes } from 'lib/primitives';

import { Card, ColGrid, Flex, Title } from 'components';

import { ButtonInline } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/ButtonInline',
    component: Flex,
} as ComponentMeta<typeof Flex>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const MyIcon = ArrowRightIcon;

const SizesTemplate: ComponentStory<typeof ButtonInline> = () => (
    <Card>
        <ColGrid numCols={4} gapY="gap-y-2">
            {Object.values(InputSizes).map(size => (
                <>
                    <ButtonInline size={size} text="ButtonInline" />
                    <ButtonInline size={size} text="ButtonInline" icon={MyIcon} />
                    <ButtonInline size={size} text="ButtonInline" icon={MyIcon} iconPosition="right" />
                </>
            ))}
        </ColGrid>
    </Card>
);

const ColorsTemplate: ComponentStory<typeof ButtonInline> = () => (
    <Card>
        <ColGrid numCols={3} numColsLg={6} gapY="gap-y-2">
            {Object.values(BaseColors).map(color => (
                <>
                    <ButtonInline color={color} text={color} />
                    <ButtonInline color={color} text={color} icon={MyIcon} />
                </>
            ))}
        </ColGrid>
    </Card>
);

const ResponsiveFlexTemplate: ComponentStory<typeof ButtonInline> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Flex>
                    <ButtonInline { ...args } text="ButtonInline" icon={MyIcon} />
                </Flex>
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Flex>
                <ButtonInline { ...args } text="Very Long ButtonInline Text" icon={MyIcon} />
            </Flex>
        </Card>
    </>
);


const LoadingStateTemplate: ComponentStory<typeof ButtonInline> = () => {
    const [loading, setLoading] = useState(false);
    
    return (
        <Card>
            <ButtonInline text="Click to Load" handleClick={ () => setLoading(!loading) } />
            <ColGrid numCols={4} gapY="gap-y-2" marginTop="mt-10">
                {
                    Object.values(InputSizes).map(size => (
                        <>
                            <ButtonInline size={size} text="Button" loading={ loading } />
                            <ButtonInline size={size} text="Button" icon={MyIcon} loading={ loading } />
                            <ButtonInline
                                size={size}
                                text="Button"
                                icon={MyIcon}
                                iconPosition="right"
                                loading={ loading }
                            />
                        </>
                    ))
                }
            </ColGrid>
            <Title>With Loading Text</Title>
            <ColGrid numCols={4} gapY="gap-y-2">
                <ButtonInline text="Button" loading={ loading } loadingText="Loading" />
                <ButtonInline text="Button" icon={MyIcon} loading={ loading } loadingText="Loading"  />
                <ButtonInline
                    text="Button"
                    icon={MyIcon}
                    iconPosition="right"
                    loading={ loading }
                    loadingText="Loading"
                />
            </ColGrid>
            <ButtonInline text="Button" icon={MyIcon} loading={ loading } />
        </Card>
    );
};

export const Sizes = SizesTemplate.bind({});

export const Colors = ColorsTemplate.bind({});

export const WithFlexParent = ResponsiveFlexTemplate.bind({});

export const WithDisabled = ResponsiveFlexTemplate.bind({});
WithDisabled.args = {
    disabled: true,
};

export const LoadingStates = LoadingStateTemplate.bind({});
LoadingStates.args = {
    disabled: true,
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
