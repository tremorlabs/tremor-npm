import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import AccordionSmall from 'components/selection-elements/AccordionSmall/AccordionSmall';
import AccordionBodySmall from 'components/selection-elements/AccordionBodySmall/AccordionBodySmall';
import AccordionHeaderSmall from 'components/selection-elements/AccordionHeaderSmall/AccordionHeaderSmall';
import AccordionListSmall from 'components/selection-elements/AccordionListSmall/AccordionListSmall';
import Text from 'components/text-elements/Text';
import Metric from 'components/text-elements/Metric';
import Card from 'components/layout-elements/Card/Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/AccordionListSmall',
    component: AccordionListSmall,
} as ComponentMeta<typeof AccordionListSmall>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof AccordionListSmall> = (args) => (
    <Card maxWidth='max-w-md'>
        <Metric value='$ 45.345' name='Sales'/>
        
        <div className='mt-5' />
        <AccordionListSmall>
            <AccordionSmall>
                <AccordionHeaderSmall>
                        What's the best thing about Alchy?
                </AccordionHeaderSmall>
                <AccordionBodySmall>
                    <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore
                    fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.
                    </Text>
                </AccordionBodySmall>
            </AccordionSmall>
            <AccordionSmall>
                <AccordionHeaderSmall>
                    What's the best thing about Vienna?
                </AccordionHeaderSmall>
                <AccordionBodySmall>
                    <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore
                    fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.
                    </Text>
                </AccordionBodySmall>
            </AccordionSmall>
            <AccordionSmall>
                <AccordionHeaderSmall>
                    What's the best thing about Lena?
                </AccordionHeaderSmall>
                <AccordionBodySmall>
                    <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore
                    fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.
                    </Text>
                </AccordionBodySmall>
            </AccordionSmall>
        </AccordionListSmall>

    </Card>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
