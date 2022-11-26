import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BarList, Card } from 'components';
import { CalendarIcon } from 'assets';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/VisElements/BarList',
    component: BarList,
} as ComponentMeta<typeof BarList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof BarList> = (args) => (
    <Card>
        <BarList {...args} />
    </Card>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    data: [
        { name: '/home', value: 100000000 },
        { name: '/imprint', value: 351 },
        { name: '/cancellation', value: 271 },
        { name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajhksdgfjkhasdg
            fjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`, value: 191 },
        { name: '/documentation', value: 0 },
    ],
    valueFormatter: (value) => `${value} USD`
};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
    data: [
        { name: '/home', value: 100000000, icon: CalendarIcon },
        { name: '/imprint', value: 351, icon: CalendarIcon },
        { name: '/cancellation', value: 271, icon: CalendarIcon },
        { name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajhksdgfjkhasdg
            fjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`, value: 191, icon: CalendarIcon },
        { name: '/documentation', value: 0, icon: CalendarIcon },
    ],
    valueFormatter: (value) => `${value} USD`
};
