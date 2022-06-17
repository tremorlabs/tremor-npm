import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Accordion from 'components/selection-elements/Accordion/Accordion';
import AccordionBody from 'components/selection-elements/AccordionBody/AccordionBody';
import AccordionHeader from 'components/selection-elements/AccordionHeader/AccordionHeader';
import AccordionList from 'components/selection-elements/AccordionList/AccordionList';
import Text from 'components/text-elements/Text';
import Metric from 'components/text-elements/Metric';
import Card from 'components/layout-elements/Card/Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/SelectionElements/AccordionList',
    component: AccordionList,
} as ComponentMeta<typeof AccordionList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof AccordionList> = (args) => (
    <Card maxWidth='max-w-md'>
        <Metric value='$ 45.345' name='Sales'/>
        <div className='mt-5' />
        <AccordionList>
            <Accordion>
                <AccordionHeader>
                        What's the best thing about Alchy?
                </AccordionHeader>
                <AccordionBody>
                    <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore
                    fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.
                    </Text>
                </AccordionBody>
            </Accordion>
            <Accordion>
                <AccordionHeader>
                    What's the best thing about Vienna?
                </AccordionHeader>
                <AccordionBody>
                    <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore
                    fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.
                    </Text>
                </AccordionBody>
            </Accordion>
        </AccordionList>
    </Card>
);
  
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
