import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseColors } from 'lib/primitives';
import Metric from '../../components/text-elements/Metric/Metric';
import Card from '../../components/layout-elements/Card/Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/TextElements/Metric',
    component: Metric,
} as ComponentMeta<typeof Metric>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Metric> = () => (
    <>
       <Card maxWidth='max-w-md'>
            <Metric number={70000} prefix='CHF '/>
        </Card>
    </>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
