import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Block, Button, Card, Flex, Text, Title, Toggle, ToggleItem } from 'components';
import { BaseColors } from 'lib';
import { CalendarIcon } from 'assets';

const Icon = CalendarIcon;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/Toggle',
    component: Toggle,
} as ComponentMeta<typeof Toggle>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleToggle = (args: any) => (
    <form>
        <Toggle { ...args }>
            <ToggleItem
                value={ 5 }
                text={ 'This is a very Long Toggle Value that is used as an edge case' }
                icon={ Icon }
            />
            <ToggleItem value={ 3 } text={ 'Three' } icon={ Icon } />
            <ToggleItem value={ 1 } text={ 'One' } icon={ Icon } />
        </Toggle>
    </form>
);

const SimpleToggleIconOnly = (args: any) => (
    <form>
        <Toggle { ...args }>
            <ToggleItem
                value={ 5 }
                icon={ Icon }
            />
            <ToggleItem value={ 3 } icon={ Icon } />
            <ToggleItem value={ 1 } icon={ Icon } />
        </Toggle>
    </form>
);

const ResponsiveTemplate: ComponentStory<typeof Toggle> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Block spaceY="space-y-2">
                    <SimpleToggle { ...args } />
                    <SimpleToggleIconOnly { ...args } />
                </Block>
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Block spaceY="space-y-2">
                <SimpleToggle { ...args } />
                <SimpleToggleIconOnly { ...args } />
            </Block>
        </Card>
    </>
);

const FlexTemplate: ComponentStory<typeof Toggle> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <SimpleToggle { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <SimpleToggle { ...args } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <SimpleToggle { ...args } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <SimpleToggle { ...args } />
                </div>
            </Flex> 
        </Card>
    </>
);

const ColorsTemplate: ComponentStory<typeof Toggle> = (args) => (
    <>
        <Card>
            <Block spaceY="space-y-2">
                { Object.values(BaseColors).map(color => (
                    <div>
                        <SimpleToggle { ...args } color={ color } />
                    </div>
                ))}
            </Block>
        </Card>
    </>
);

const WithControlledStateTemplate: ComponentStory<typeof Toggle> = () => {
    const [value, setValue] = useState<number | null>(5);
    return (
        <Card>
            <Toggle value={value} onValueChange={ (value) => { setValue(value); alert(value); } }>
                <ToggleItem value={5} text={'Five'} />
                <ToggleItem value={3} text={'Three'} />
                <ToggleItem value={1} text={'One'} />
            </Toggle>
            <Button text="Reset" onClick={ () => setValue(null) } />
            <Button text="Set to One" onClick={ () => setValue(1) } />
        </Card>
    );
};
  
export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
    defaultValue: 5,
    handleSelect: (value) => console.log(value),
};


export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
    defaultValue: 5,
};

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
    defaultValue: 5
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
    defaultValue: 5
};

export const WithControlledState = WithControlledStateTemplate.bind({});
