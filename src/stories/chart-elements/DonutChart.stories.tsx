import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { 
    BadgeDelta,
    Card,
    DonutChart,
    Dropdown,
    DropdownItem,
    Flex,
    List,
    ListItem,
    Title
} from 'components';
import { DeltaType } from 'lib';
import { DonutChartDataPoint } from 'components/chart-elements/DonutChart/DonutChart';

const stocks = [
    {
        stock: 'Uber Inc.',
        value: '1,340',
        rating: '23%',
        delta: 'moderateIncrease',
    },
    {
        stock: 'Novartis AG',
        value: '4,290',
        rating: '12%',
        delta: 'moderateDecrease',
    },
    {
        stock: 'Holcim',
        value: '3,910',
        rating: '3.4%',
        delta: 'moderateDecrease',
    },
    {
        stock: 'Signa Group',
        value: '10,140',
        rating: '6%',
        delta: 'increase',
    },
    {
        stock: 'Apple Inc.',
        value: '12,340',
        rating: '5%',
        delta: 'moderateDecrease',
    },
    {
        stock: 'Microsoft Inc.',
        value: '9,340',
        rating: '1.8%',
        delta: 'moderateIncrease',
    },
];


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/ChartElements/DonutChart',
    component: DonutChart,
} as ComponentMeta<typeof DonutChart>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof DonutChart> = (args) => (
    <>
        <Title>Base Layer (Beta)</Title>
        <div className="tr-w-full tr-mt-4">
            <Card>
                <Flex spaceX="space-x-4" justifyContent="justify-start" alignItems="items-center">
                    <Title>Asset</Title>
                    <Dropdown
                        handleSelect={ (value) => console.log('The selected value is', value) }
                        placeholder="Portfolio Selection"
                        maxWidth="max-w-xs"
                    >
                        <DropdownItem
                            value={ 1 }
                            text="Community portfolio"
                        />
                        <DropdownItem
                            value={ 2 }
                            text="My portfolio"
                        />
                    </Dropdown>
                </Flex>
                {/* <Flex spaceX='space-x-4' justifyContent='justify-between' marginTop='mt-4'> */}
                <DonutChart { ...args } />
                <div className="tr-mt-6">
                    <List>
                        {stocks.map((item) => (
                            <ListItem key={ item.stock }>
                                <span> {item.stock} </span>
                                <Flex spaceX="space-x-2" justifyContent="justify-end">
                                    {/* <span> {item.value} </span> */}
                                    <BadgeDelta
                                        deltaType={ item.delta as DeltaType }
                                        text={ item.rating }
                                        isIncreasePositive={true}
                                        size="xs"
                                    />
                                </Flex>
                            </ListItem>
                        ))}
                    </List>
                </div>
                {/* </Flex> */}
            </Card>
        </div>
    </>
);

const DefaultTemplate: ComponentStory<typeof DonutChart>= ({ ...args }) => (
    <Card>
        <DonutChart { ...args } />
    </Card>
);

const data: DonutChartDataPoint[] = [
    {
        'name': 'Group A',
        'value': 2400,
        'color': 'blue',
    },
    {
        'name': 'Group B',
        'value': 4567,
        'color': 'sky',
    },
    {
        'name': 'Group C',
        'value': 1398,
        'color': 'emerald',
    },
    {
        'name': 'Group D',
        'value': 9800,
        'color': 'amber',
    },
    {
        'name': 'Group E',
        'value': 3908,
        'color': 'gray',
    }
];

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    // categories: [ 'name 1', 'name 2', 'name 3', 'name 4', 'name 5', 'name 6' ],
    data: data,
    marginTop: 'mt-6'
};
