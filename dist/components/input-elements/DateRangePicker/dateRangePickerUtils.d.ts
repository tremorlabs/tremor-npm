export type DateRangePickerOption = {
    value: string;
    text: string;
    from: Date;
    to?: Date;
};
export type DropdownValues = Map<string, Omit<DateRangePickerOption, "value">>;
export declare const makeDateRangePickerClassName: (className: string) => string;
export declare const parseStartDate: (startDate: Date | undefined, minDate: Date | undefined, selectedDropdownValue: string | undefined, selectValues: DropdownValues) => Date | undefined;
export declare const parseEndDate: (endDate: Date | undefined, maxDate: Date | undefined, selectedDropdownValue: string | undefined, selectValues: DropdownValues) => Date | undefined;
export declare const defaultOptions: DateRangePickerOption[];
export declare const formatSelectedDates: (startDate: Date | undefined, endDate: Date | undefined, locale?: Locale, displayFormat?: string) => string;
