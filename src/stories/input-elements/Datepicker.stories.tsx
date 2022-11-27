import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card, ColGrid, Datepicker, Flex, Text, Title } from 'components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tremor/InputElements/Datepicker',
    component: Datepicker,
} as ComponentMeta<typeof Datepicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof Datepicker> = (args) => (
    <>
        <Title>Mobile</Title>
        <div className="tr-w-64">
            <Card>
                <Datepicker { ...args } />
            </Card>
        </div>
        <Title marginTop="mt-5">Desktop</Title>
        <Card>
            <Datepicker { ...args } />
        </Card>
        <Title marginTop="mt-5">With Black Background</Title>
        <Card>
            <div className="tr-flex tr-items-center tr-bg-black tr-h-24">
                <Datepicker { ...args } />
            </div>
        </Card>
    </>
);

const FlexTemplate: ComponentStory<typeof Datepicker> = (args) => (
    <>
        <Card>
            <Text marginTop="mt-2">Justify Start</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <Datepicker { ...args } />
            </Flex>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <Datepicker { ...args } enableRelativeDates={ false } />
            </Flex>
            <Text marginTop="mt-2">Justify End</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <Datepicker { ...args } />
            </Flex>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <Datepicker { ...args } enableRelativeDates={ false } />
            </Flex>
            <Text marginTop="mt-2">Justify End with inner div</Text>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <Datepicker { ...args } />
                </div>
            </Flex>
            <Flex justifyContent="justify-end" marginTop="mt-2">
                <div>
                    <Datepicker { ...args } enableRelativeDates={ false } />
                </div>
            </Flex>
            <Text marginTop="mt-2">Justify Start with inner div</Text>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <Datepicker { ...args } />
                </div>
            </Flex>
            <Flex justifyContent="justify-start" marginTop="mt-2">
                <div>
                    <Datepicker { ...args } enableRelativeDates={ false } />
                </div>
            </Flex>
        </Card>
    </>
);

const WithSelfDetectingModalTemplate: ComponentStory<typeof Datepicker> = () => (
    <ColGrid numColsLg={ 6 }>
        <div>emptyCol</div>
        <div>emptyCol</div>
        <div>emptyCol</div>
        <div>emptyCol</div>
        <div>emptyCol</div>
        <Datepicker enableRelativeDates={ false } />
    </ColGrid>
);

const handleSelect = (startDate: Date, endDate: Date) => alert(`${startDate} + ${endDate}`);

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
    handleSelect: handleSelect,
};

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
    maxWidth: 'max-w-xs'
};

export const WithDefaultDates = ResponsiveTemplate.bind({});
WithDefaultDates.args = {
    defaultStartDate: new Date(2022, 6, 1),
    defaultEndDate: new Date(2022, 7, 30),
    handleSelect: handleSelect,
};

export const WithRelativeDatesDisabled = ResponsiveTemplate.bind({});
WithRelativeDatesDisabled.args = {
    defaultStartDate: new Date(2022, 6, 1),
    defaultEndDate: new Date(2022, 7, 30),
    enableRelativeDates: false,
    handleSelect: handleSelect,
};

export const WithMinDate = ResponsiveTemplate.bind({});
WithMinDate.args = {
    minDate: new Date(2022, 6, 1),
};

export const WithMaxDate = ResponsiveTemplate.bind({});
WithMaxDate.args = {
    maxDate: new Date(2022, 6, 1),
};

export const WithMinAndMaxDate = ResponsiveTemplate.bind({});
WithMinAndMaxDate.args = {
    minDate: new Date(2022, 6, 1),
    maxDate: new Date(2022, 7, 30),
    handleSelect: handleSelect,
};

export const WithMinAndMaxDateAndDefaultDates = ResponsiveTemplate.bind({});
WithMinAndMaxDateAndDefaultDates.args = {
    defaultStartDate: new Date(2022, 6, 1),
    defaultEndDate: new Date(2022, 7, 30),
    minDate: new Date(2022, 6, 1),
    maxDate: new Date(2022, 7, 30),
    handleSelect: handleSelect,
};

export const WithDefaultDatesExceedingMinMax = ResponsiveTemplate.bind({});
WithDefaultDatesExceedingMinMax.args = {
    defaultStartDate: new Date(2022, 5, 1),
    defaultEndDate: new Date(2022, 8, 30),
    minDate: new Date(2022, 6, 1),
    maxDate: new Date(2022, 7, 30),
};

export const WithDefaultStartDateOnly = ResponsiveTemplate.bind({});
WithDefaultStartDateOnly.args = {
    defaultStartDate: new Date(2022, 10, 1),
};

export const WithDefaultEndDateOnly = ResponsiveTemplate.bind({});
WithDefaultEndDateOnly.args = {
    defaultEndDate: new Date(2022, 10, 1),
};

export const WithSelfDetectingModal = WithSelfDetectingModalTemplate.bind({});

export const WithDefaultRelativeFilterOption = ResponsiveTemplate.bind({});
WithDefaultRelativeFilterOption.args = {
    defaultRelativeFilterOption: 'tdy',
    handleSelect: handleSelect,
};

export const WithYearPagination = ResponsiveTemplate.bind({});
WithYearPagination.args = {
    enableYearPagination: true,
    handleSelect: handleSelect,
};
