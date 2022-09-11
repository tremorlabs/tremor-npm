import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { 
    BadgeDelta,
    Button,
    Card,
    DeltaBar,
    Flex,
    Footer,
    Metric,
    ProgressBar,
    Subtitle,
    Text,
    Title 
} from 'components';

const handleClick = () => (console.log('clicked'));

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/Playground',
    component: Card,
} as ComponentMeta<typeof Card>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Card> = () => (
    <div className="mx-auto">
        <Card maxWidth='max-w-md'>
            <Flex>
                <Title>
                    Ticket Sales
                </Title>
                <BadgeDelta text="20.1%" deltaType="increase" isIncreasePositive={ true } />
            </Flex>
            <Subtitle>
                April 2021
            </Subtitle>
            <Metric marginTop='mt-2' prefix='$ ' number={250000}/>
            <Text marginTop='mt-4'>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. 
            </Text>
            <Flex marginTop='mt-4'>
                <Flex justifyContent="justify-start" alignItems="items-baseline" spaceX="space-x-2">
                    <Text>25%</Text>
                    <Text>($ 250,000)</Text>
                </Flex>
                <Text>$ 1,000,000</Text>
            </Flex>
            <ProgressBar marginTop="mt-2" percentageValue={50} showAnimation={true} />
            <Footer>
                <Flex justifyContent="justify-end" spaceX="space-x-2">
                    <Button text="Button Text" handleClick={handleClick} size="xs" importance="secondary" />
                    <Button text="Button Text" handleClick={handleClick} size="xs" />
                </Flex>
            </Footer>
        </Card>
        {/* <Card>
            <Flex>
                <Title>
                    Ticket Sales
                </Title>
                <BadgeDelta text="8.1%" deltaType="moderateIncrease" isIncreasePositive={ true } />
            </Flex>
            <Subtitle>
                April 2021
            </Subtitle>
            <Metric marginTop='mt-2' prefix='$ ' number={3500} separator="," />
            <Text marginTop='mt-4'>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. 
            </Text>
            <Flex marginTop='mt-4'>
                <Flex justifyContent="justify-start" alignItems="items-baseline" spaceX="space-x-2">
                    <Text>12.3%</Text>
                    <Text>($ 200)</Text>
                </Flex>
                <Text>$ 20,000</Text>
            </Flex>
            <div style={{'marginTop': '5px'}}>
                <DeltaBar percentageValue={75} />
            </div>
            <Footer>
                <Flex justifyContent="justify-end" spaceX="space-x-2">
                    <Button text="Button Text" handleClick={handleClick} size="xs" importance="secondary" />
                    <Button text="Button Text" handleClick={handleClick} size="xs" />
                </Flex>
            </Footer>
        </Card> */}
    </div>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: undefined
};
