import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DonutChart, Card, Title, List, ListItem, Text, Flex } from 'components';
import { data } from './helpers/testData';

const stocks = [
    {
      stock: "Uber Inc.",
      rating: "23%",
    },
    {
      stock: "Novartis AG",
      rating: "12%",
    },
    {
      stock: "Holcim",
      rating: "3.4%",
    },
    {
      stock: "Signa Group",
      rating: "6%",
    },
    {
      stock: "Apple Inc.",
      rating: "5%",
    },
    {
      stock: "Microsoft Inc.",
      rating: "1.8%",
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
        <div className="tr-w-full">
            <Card>
                <Flex spaceX='space-x-4' justifyContent='justify-between'>
                    <DonutChart { ...args } />
                    <List>
                        {stocks.map((item) => (
                            <ListItem>
                                <span> {item.stock} </span>
                                <span> {item.rating} </span>
                            </ListItem>
                        ))}
                    </List>
                </Flex>
            </Card>
        </div>
    </>
);

const DefaultTemplate: ComponentStory<typeof DonutChart>= ({ ...args }) => (
    <Card>
        <DonutChart { ...args } />
    </Card>
);

export const DefaultResponsive = ResponsiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultResponsive.args = {
    // categories: [ 'name 1', 'name 2', 'name 3', 'name 4', 'name 5', 'name 6' ],
};