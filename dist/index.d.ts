/// <reference types="react" />
import React$1, { ReactNode } from 'react';
import { Payload, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { EventProps as EventProps$1 } from 'components/chart-elements/common';
import { CustomTooltipProps as CustomTooltipProps$1 } from 'components/chart-elements/common/CustomTooltipProps';
import { Color as Color$1, Size as Size$2, DeltaType as DeltaType$1, HorizontalPosition as HorizontalPosition$1, VerticalPosition as VerticalPosition$1, ValueFormatter as ValueFormatter$1 } from 'lib';
import { enUS } from 'date-fns/locale';
import BaseAnimationTimingProps$1 from 'components/chart-elements/common/BaseAnimationTimingProps';

type ValueFormatter = {
    (value: number): string;
};
type CurveType = "linear" | "natural" | "monotone" | "step";
type Interval = "preserveStartEnd" | "equidistantPreserveStart";
type IntervalType = "preserveStartEnd" | Interval;
declare const iconVariantValues: readonly ["simple", "light", "shadow", "solid", "outlined"];
type IconVariant = (typeof iconVariantValues)[number];
type HorizontalPosition = "left" | "right";
type VerticalPosition = "top" | "bottom";
type ButtonVariant = "primary" | "secondary" | "light";
declare const deltaTypeValues: readonly ["increase", "moderateIncrease", "decrease", "moderateDecrease", "unchanged"];
type DeltaType = (typeof deltaTypeValues)[number];
declare const sizeValues: readonly ["xs", "sm", "md", "lg", "xl"];
type Size$1 = (typeof sizeValues)[number];
declare const colorValues: readonly ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
type Color = (typeof colorValues)[number];
type CustomColor = Color | string;
declare const getIsBaseColor: (color: Color | string) => boolean;
declare const justifyContentValues: readonly ["start", "end", "center", "between", "around", "evenly"];
type JustifyContent = (typeof justifyContentValues)[number];
declare const alignItemsValues: readonly ["start", "end", "center", "baseline", "stretch"];
type AlignItems = (typeof alignItemsValues)[number];
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

interface BaseAnimationTimingProps {
    animationDuration?: number;
    showAnimation?: boolean;
}

type CustomTooltipProps = {
    payload: Payload<string | number | (string | number)[], string | number>[] | undefined;
    active: boolean | undefined;
    label: NameType | undefined;
};

type FixedProps = {
    eventType: "dot" | "category" | "bar" | "slice" | "bubble";
    categoryClicked: string;
};
type BaseEventProps = FixedProps & {
    [key: string]: number | string;
};
type EventProps = BaseEventProps | null | undefined;
interface BaseChartProps extends BaseAnimationTimingProps, React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    categories: string[];
    index: string;
    colors?: (Color | string)[];
    valueFormatter?: ValueFormatter;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    intervalType?: IntervalType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinValue?: boolean;
    minValue?: number;
    maxValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    onValueChange?: (value: EventProps) => void;
    enableLegendSlider?: boolean;
    customTooltip?: React.ComponentType<CustomTooltipProps>;
    rotateLabelX?: {
        angle: number;
        verticalShift?: number;
        xAxisHeight?: number;
    };
    tickGap?: number;
}

interface AreaChartProps extends BaseChartProps {
    stack?: boolean;
    curveType?: CurveType;
    connectNulls?: boolean;
    showGradient?: boolean;
}
declare const AreaChart$1: React$1.ForwardRefExoticComponent<AreaChartProps & React$1.RefAttributes<HTMLDivElement>>;

interface BarChartProps extends BaseChartProps {
    layout?: "vertical" | "horizontal";
    stack?: boolean;
    relative?: boolean;
}
declare const BarChart: React$1.ForwardRefExoticComponent<BarChartProps & React$1.RefAttributes<HTMLDivElement>>;

type DonutChartVariant = "donut" | "pie";
interface DonutChartProps extends BaseAnimationTimingProps {
    data: any[];
    category?: string;
    index?: string;
    colors?: (Color | string)[];
    variant?: DonutChartVariant;
    valueFormatter?: ValueFormatter;
    label?: string;
    showLabel?: boolean;
    showAnimation?: boolean;
    showTooltip?: boolean;
    noDataText?: string;
    className?: string;
    onValueChange?: (value: EventProps$1) => void;
    customTooltip?: React$1.ComponentType<CustomTooltipProps$1>;
}
declare const DonutChart: React$1.ForwardRefExoticComponent<DonutChartProps & React$1.RefAttributes<HTMLDivElement>>;

interface LineChartProps extends BaseChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
}
declare const LineChart: React$1.ForwardRefExoticComponent<LineChartProps & React$1.RefAttributes<HTMLDivElement>>;

type ScatterChartValueFormatter = {
    x?: ValueFormatter;
    y?: ValueFormatter;
    size?: ValueFormatter;
};
interface ScatterChartProps extends BaseAnimationTimingProps, React$1.HTMLAttributes<HTMLDivElement> {
    data: any[];
    x: string;
    y: string;
    category: string;
    size?: string;
    valueFormatter?: ScatterChartValueFormatter;
    sizeRange?: number[];
    colors?: (Color | string)[];
    showOpacity?: boolean;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    intervalType?: IntervalType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinXValue?: boolean;
    minXValue?: number;
    maxXValue?: number;
    autoMinYValue?: boolean;
    minYValue?: number;
    maxYValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    enableLegendSlider?: boolean;
    onValueChange?: (value: EventProps$1) => void;
    customTooltip?: React$1.ComponentType<CustomTooltipProps$1>;
    rotateLabelX?: {
        angle: number;
        verticalShift: number;
        xAxisHeight: number;
    };
    tickGap?: number;
}
declare const ScatterChart: React$1.ForwardRefExoticComponent<ScatterChartProps & React$1.RefAttributes<HTMLDivElement>>;

interface BadgeProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    color?: Color$1;
    size?: Size$2;
    icon?: React$1.ElementType;
    tooltip?: string;
}
declare const Badge: React$1.ForwardRefExoticComponent<BadgeProps & React$1.RefAttributes<HTMLSpanElement>>;

interface BadgeDeltaProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    deltaType?: DeltaType$1;
    isIncreasePositive?: boolean;
    size?: Size$2;
    tooltip?: string;
}
declare const BadgeDelta: React$1.ForwardRefExoticComponent<BadgeDeltaProps & React$1.RefAttributes<HTMLSpanElement>>;

interface IconProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    icon: React$1.ElementType;
    variant?: IconVariant;
    tooltip?: string;
    size?: Size$1;
    color?: Color;
}
declare const Icon: React$1.ForwardRefExoticComponent<IconProps & React$1.RefAttributes<HTMLSpanElement>>;

interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ElementType;
    iconPosition?: HorizontalPosition;
    size?: Size$1;
    color?: Color;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    tooltip?: string;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

type Locale$1 = typeof enUS;
type DatePickerValue = Date | undefined;
interface DatePickerProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
    value?: Date;
    defaultValue?: Date;
    onValueChange?: (value: DatePickerValue) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    disabled?: boolean;
    color?: Color;
    locale?: Locale$1;
    enableClear?: boolean;
    displayFormat?: string;
    enableYearNavigation?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[];
    children?: React$1.ReactElement[] | React$1.ReactElement;
}
declare const DatePicker: React$1.ForwardRefExoticComponent<DatePickerProps & React$1.RefAttributes<HTMLDivElement>>;

type Locale = typeof enUS;
type DateRangePickerValue = {
    from?: Date;
    to?: Date;
    selectValue?: string;
};
interface DateRangePickerProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
    value?: DateRangePickerValue;
    defaultValue?: DateRangePickerValue;
    onValueChange?: (value: DateRangePickerValue) => void;
    enableSelect?: boolean;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    selectPlaceholder?: string;
    disabled?: boolean;
    color?: Color;
    locale?: Locale;
    enableClear?: boolean;
    displayFormat?: string;
    enableYearNavigation?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[];
    children?: React$1.ReactElement[] | React$1.ReactElement;
}
declare const DateRangePicker: React$1.ForwardRefExoticComponent<DateRangePickerProps & React$1.RefAttributes<HTMLDivElement>>;

interface DateRangePickerItemProps extends React$1.HTMLAttributes<HTMLLIElement> {
    value: string;
    from: Date;
    to?: Date;
}
declare const DateRangePickerItem: React$1.ForwardRefExoticComponent<DateRangePickerItemProps & React$1.RefAttributes<HTMLLIElement>>;

interface MultiSelectProps extends React$1.HTMLAttributes<HTMLInputElement> {
    defaultValue?: string[];
    name?: string;
    value?: string[];
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    placeholderSearch?: string;
    disabled?: boolean;
    icon?: React$1.ElementType | React$1.JSXElementConstructor<any>;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    children: React$1.ReactNode;
}
declare const MultiSelect: React$1.ForwardRefExoticComponent<MultiSelectProps & React$1.RefAttributes<HTMLInputElement>>;

interface MultiSelectItemProps extends React$1.HTMLAttributes<HTMLLIElement> {
    value: string;
}
declare const MultiSelectItem: React$1.ForwardRefExoticComponent<MultiSelectItemProps & React$1.RefAttributes<HTMLLIElement>>;

interface BaseInputProps extends React$1.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "password" | "email" | "url" | "number";
    defaultValue?: string | number;
    value?: string | number;
    icon?: React$1.ElementType | React$1.JSXElementConstructor<any>;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    stepper?: ReactNode;
    onValueChange?: (value: any) => void;
    makeInputClassName: (className: string) => string;
}

interface NumberInputProps extends Omit<BaseInputProps, "type" | "stepper" | "onSubmit" | "makeInputClassName"> {
    step?: string | number;
    enableStepper?: boolean;
    onSubmit?: (value: number) => void;
    onValueChange?: (value: number) => void;
}
declare const NumberInput: React$1.ForwardRefExoticComponent<NumberInputProps & React$1.RefAttributes<HTMLInputElement>>;

interface SearchSelectProps extends React$1.HTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    name?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: React$1.ElementType | React$1.JSXElementConstructor<any>;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    enableClear?: boolean;
    children: React$1.ReactNode;
}
declare const SearchSelect: React$1.ForwardRefExoticComponent<SearchSelectProps & React$1.RefAttributes<HTMLInputElement>>;

interface SearchSelectItemProps extends React$1.HTMLAttributes<HTMLLIElement> {
    value: string;
    icon?: React$1.ElementType;
}
declare const SearchSelectItem: React$1.ForwardRefExoticComponent<SearchSelectItemProps & React$1.RefAttributes<HTMLLIElement>>;

interface SelectProps extends React$1.HTMLAttributes<HTMLInputElement> {
    value?: string;
    name?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: React$1.JSXElementConstructor<any>;
    enableClear?: boolean;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    children: React$1.ReactNode;
}
declare const Select: React$1.ForwardRefExoticComponent<SelectProps & React$1.RefAttributes<HTMLInputElement>>;

interface SelectItemProps extends React$1.HTMLAttributes<HTMLLIElement> {
    value: string;
    icon?: React$1.ElementType;
}
declare const SelectItem: React$1.ForwardRefExoticComponent<SelectItemProps & React$1.RefAttributes<HTMLLIElement>>;

interface SwitchProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (value: boolean) => void;
    color?: Color$1;
    name?: string;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    tooltip?: string;
}
declare const Switch: React$1.ForwardRefExoticComponent<SwitchProps & React$1.RefAttributes<HTMLDivElement>>;

interface TabProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ElementType;
}
declare const Tab: React$1.ForwardRefExoticComponent<TabProps & React$1.RefAttributes<HTMLButtonElement>>;

interface TabGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    defaultIndex?: number;
    index?: number;
    onIndexChange?: (index: number) => void;
    children: React$1.ReactElement[] | React$1.ReactElement;
}
declare const TabGroup: React$1.ForwardRefExoticComponent<TabGroupProps & React$1.RefAttributes<HTMLDivElement>>;

type TabVariant = "line" | "solid";
interface TabListProps extends React$1.HTMLAttributes<HTMLDivElement> {
    color?: Color$1;
    variant?: TabVariant;
    children: React$1.ReactElement[] | React$1.ReactElement;
}
declare const TabList: React$1.ForwardRefExoticComponent<TabListProps & React$1.RefAttributes<HTMLDivElement>>;

declare const TabPanel: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

declare const TabPanels: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement> {
    defaultValue?: string | number;
    value?: string | number;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

type TextInputProps = Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
    type?: "text" | "password" | "email" | "url";
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    icon?: React$1.ElementType | React$1.JSXElementConstructor<any>;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
};
declare const TextInput: React$1.ForwardRefExoticComponent<Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
    type?: "text" | "url" | "email" | "password" | undefined;
    defaultValue?: string | undefined;
    value?: string | undefined;
    onValueChange?: ((value: string) => void) | undefined;
    icon?: React$1.JSXElementConstructor<any> | React$1.ElementType<any, keyof React$1.JSX.IntrinsicElements> | undefined;
    error?: boolean | undefined;
    errorMessage?: string | undefined;
    disabled?: boolean | undefined;
} & React$1.RefAttributes<HTMLInputElement>>;

interface AccordionProps extends React$1.HTMLAttributes<HTMLDivElement> {
    defaultOpen?: boolean;
}
declare const Accordion: React$1.ForwardRefExoticComponent<AccordionProps & React$1.RefAttributes<HTMLDivElement>>;

declare const AccordionBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

declare const AccordionHeader: React$1.ForwardRefExoticComponent<React$1.ButtonHTMLAttributes<HTMLButtonElement> & React$1.RefAttributes<HTMLButtonElement>>;

interface AccordionListProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactElement[] | React$1.ReactElement;
}
declare const AccordionList: React$1.ForwardRefExoticComponent<AccordionListProps & React$1.RefAttributes<HTMLDivElement>>;

interface CardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    decoration?: HorizontalPosition$1 | VerticalPosition$1 | "";
    decorationColor?: Color$1;
}
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;

declare const Divider: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

interface FlexProps extends React$1.HTMLAttributes<HTMLDivElement> {
    flexDirection?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    children: React$1.ReactNode;
}
declare const Flex: React$1.ForwardRefExoticComponent<FlexProps & React$1.RefAttributes<HTMLDivElement>>;

interface ColProps extends React$1.HTMLAttributes<HTMLDivElement> {
    numColSpan?: number;
    numColSpanSm?: number;
    numColSpanMd?: number;
    numColSpanLg?: number;
}
declare const Col: React$1.ForwardRefExoticComponent<ColProps & React$1.RefAttributes<HTMLDivElement>>;

interface GridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    numItems?: number;
    numItemsSm?: number;
    numItemsMd?: number;
    numItemsLg?: number;
    children: React$1.ReactNode;
}
declare const Grid: React$1.ForwardRefExoticComponent<GridProps & React$1.RefAttributes<HTMLDivElement>>;

type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
type DialogProps = React$1.HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onClose: (val: boolean) => void;
    role?: "dialog" | "alertdialog";
} & XOR<{
    unmount?: boolean;
}, {
    static?: boolean;
}>;
declare const Dialog: React$1.ForwardRefExoticComponent<DialogProps & React$1.RefAttributes<HTMLDivElement>>;

type DialogPanelProps = React$1.HTMLAttributes<HTMLDivElement>;
declare const DialogPanel: React$1.ForwardRefExoticComponent<DialogPanelProps & React$1.RefAttributes<HTMLDivElement>>;

declare const List: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLUListElement> & React$1.RefAttributes<HTMLUListElement>>;

declare const ListItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLLIElement> & React$1.RefAttributes<HTMLLIElement>>;

declare const Table: React$1.ForwardRefExoticComponent<React$1.TableHTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;

declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;

declare const TableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;

declare const TableFoot: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;

declare const TableFooterCell: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;

declare const TableHead: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;

declare const TableHeaderCell: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;

declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;

interface BaseSparkChartProps extends BaseAnimationTimingProps$1, React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    categories: string[];
    index: string;
    colors?: (Color | string)[];
    noDataText?: string;
    autoMinValue?: boolean;
    minValue?: number;
    maxValue?: number;
}

interface SparkBarChartProps extends BaseSparkChartProps {
    stack?: boolean;
    relative?: boolean;
}
declare const SparkBarChart: React$1.ForwardRefExoticComponent<SparkBarChartProps & React$1.RefAttributes<HTMLDivElement>>;

interface SparkLineChartProps extends BaseSparkChartProps {
    curveType?: CurveType;
    connectNulls?: boolean;
}
declare const SparkLineChart: React$1.ForwardRefExoticComponent<SparkLineChartProps & React$1.RefAttributes<HTMLDivElement>>;

interface SparkAreaChartProps extends BaseSparkChartProps {
    stack?: boolean;
    curveType?: CurveType;
    connectNulls?: boolean;
    showGradient?: boolean;
}
declare const AreaChart: React$1.ForwardRefExoticComponent<SparkAreaChartProps & React$1.RefAttributes<HTMLDivElement>>;

declare const Bold: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLElement> & React$1.RefAttributes<HTMLElement>>;

interface CalloutProps extends React$1.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon?: React$1.ElementType;
    color?: Color$1;
}
declare const Callout: React$1.ForwardRefExoticComponent<CalloutProps & React$1.RefAttributes<HTMLDivElement>>;

declare const Italic: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLElement> & React$1.RefAttributes<HTMLElement>>;

interface LegendProps extends React$1.OlHTMLAttributes<HTMLOListElement> {
    categories: string[];
    colors?: (Color$1 | string)[];
    onClickLegendItem?: (category: string, color: Color$1 | string) => void;
    activeLegend?: string;
    enableLegendSlider?: boolean;
}
declare const Legend: React$1.ForwardRefExoticComponent<LegendProps & React$1.RefAttributes<HTMLOListElement>>;

interface MetricProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Metric: React$1.ForwardRefExoticComponent<MetricProps & React$1.RefAttributes<HTMLParagraphElement>>;

interface SubtitleProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Subtitle: React$1.ForwardRefExoticComponent<SubtitleProps & React$1.RefAttributes<HTMLParagraphElement>>;

interface TextProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Text: React$1.ForwardRefExoticComponent<TextProps & React$1.RefAttributes<HTMLParagraphElement>>;

interface TitleProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    color?: Color;
}
declare const Title: React$1.ForwardRefExoticComponent<TitleProps & React$1.RefAttributes<HTMLParagraphElement>>;

type Bar<T> = T & {
    key?: string;
    value: number;
    name: string;
    icon?: React$1.JSXElementConstructor<any>;
    href?: string;
    target?: string;
    color?: Color$1;
};
interface BarListProps<T = any> extends React$1.HTMLAttributes<HTMLDivElement> {
    data: Bar<T>[];
    valueFormatter?: ValueFormatter$1;
    color?: Color$1;
    showAnimation?: boolean;
    onValueChange?: (payload: Bar<T>) => void;
}
declare function BarListInner<T>(props: BarListProps<T>, ref: React$1.ForwardedRef<HTMLDivElement>): React$1.JSX.Element;
declare namespace BarListInner {
    var displayName: string;
}
declare const BarList: <T>(p: BarListProps<T> & {
    ref?: React$1.ForwardedRef<HTMLDivElement> | undefined;
}) => ReturnType<typeof BarListInner>;

interface CategoryBarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    values: number[];
    colors?: Color[];
    markerValue?: number;
    showLabels?: boolean;
    tooltip?: string;
    showAnimation?: boolean;
}
declare const CategoryBar: React$1.ForwardRefExoticComponent<CategoryBarProps & React$1.RefAttributes<HTMLDivElement>>;

interface DeltaBarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: number;
    isIncreasePositive?: boolean;
    tooltip?: string;
    showAnimation?: boolean;
}
declare const DeltaBar: React$1.ForwardRefExoticComponent<DeltaBarProps & React$1.RefAttributes<HTMLDivElement>>;

interface MarkerBarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: number;
    minValue?: number;
    maxValue?: number;
    markerTooltip?: string;
    rangeTooltip?: string;
    showAnimation?: boolean;
    color?: Color;
}
declare const MarkerBar: React$1.ForwardRefExoticComponent<MarkerBarProps & React$1.RefAttributes<HTMLDivElement>>;

interface ProgressBarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: number;
    label?: string;
    tooltip?: string;
    showAnimation?: boolean;
    color?: Color;
}
declare const ProgressBar: React$1.ForwardRefExoticComponent<ProgressBarProps & React$1.RefAttributes<HTMLDivElement>>;

type Size = "xs" | "sm" | "md" | "lg" | "xl";
interface ProgressCircleProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value?: number;
    size?: Size;
    color?: Color$1;
    showAnimation?: boolean;
    tooltip?: string;
    radius?: number;
    strokeWidth?: number;
    children?: React$1.ReactNode;
}
declare const ProgressCircle: React$1.ForwardRefExoticComponent<ProgressCircleProps & React$1.RefAttributes<HTMLDivElement>>;

interface TrackerBlockProps {
    key?: string | number;
    color?: Color | string;
    tooltip?: string;
}
interface TrackerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    data: TrackerBlockProps[];
}
declare const Tracker: React$1.ForwardRefExoticComponent<TrackerProps & React$1.RefAttributes<HTMLDivElement>>;

export { Accordion, AccordionBody, AccordionHeader, AccordionList, AccordionListProps, AccordionProps, AlignItems, AreaChart$1 as AreaChart, AreaChartProps, Badge, BadgeDelta, BadgeDeltaProps, BadgeProps, BarChart, BarChartProps, BarList, BarListProps, Bold, Button, ButtonProps, ButtonVariant, Callout, CalloutProps, Card, CardProps, CategoryBar, CategoryBarProps, Col, ColProps, Color, CurveType, CustomColor, CustomTooltipProps, DatePicker, DatePickerProps, DatePickerValue, DateRangePicker, DateRangePickerItem, DateRangePickerItemProps, DateRangePickerProps, DateRangePickerValue, DeltaBar, DeltaBarProps, DeltaType, Dialog, DialogPanel, DialogPanelProps, DialogProps, Divider, DonutChart, DonutChartProps, EventProps, Flex, FlexDirection, FlexProps, Grid, GridProps, HorizontalPosition, Icon, IconProps, IconVariant, Interval, IntervalType, Italic, JustifyContent, Legend, LegendProps, LineChart, LineChartProps, List, ListItem, MarkerBar, MarkerBarProps, Metric, MetricProps, MultiSelect, MultiSelectItem, MultiSelectItemProps, MultiSelectProps, NumberInput, NumberInputProps, ProgressBar, ProgressBarProps, ProgressCircle, ProgressCircleProps, ScatterChart, ScatterChartProps, SearchSelect, SearchSelectItem, SearchSelectItemProps, SearchSelectProps, Select, SelectItem, SelectItemProps, SelectProps, Size$1 as Size, AreaChart as SparkAreaChart, SparkAreaChartProps, SparkBarChart, SparkBarChartProps, SparkLineChart, SparkLineChartProps, Subtitle, SubtitleProps, Switch, SwitchProps, Tab, TabGroup, TabGroupProps, TabList, TabListProps, TabPanel, TabPanels, TabProps, Table, TableBody, TableCell, TableFoot, TableFooterCell, TableHead, TableHeaderCell, TableRow, Text, TextInput, TextInputProps, TextProps, Textarea, TextareaProps, Title, TitleProps, Tracker, TrackerProps, ValueFormatter, VerticalPosition, getIsBaseColor };
