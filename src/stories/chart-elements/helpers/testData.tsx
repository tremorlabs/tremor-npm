import { DonutChartDataPoint } from 'components/chart-elements/DonutChart/DonutChart';

export const simpleBaseChartData = [
    {
        month: 'Jan 21\'',
        Sales: 4000,
        'Successfull Payments': 3000,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'Feb 21\'',
        Sales: 3000,
        'Successfull Payments': 2000,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'Mar 21\'',
        Sales: 2000,
        'Successfull Payments': 1700,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'Apr 21\'',
        Sales: 2780,
        'Successfull Payments': 2500,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'May 21',
        Sales: 1890,
        'Successfull Payments': 1000,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'Jun 21\'',
        Sales: 2390,
        'Successfull Payments': 2000,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
    {
        month: 'Jul 21\'',
        Sales: 3490,
        'Successfull Payments': 3000,
        'This is an edge case': 100000000,
        'Test': 5000,
    },
];

export const simpleDonutChartData: DonutChartDataPoint[] = [
    {
        'name': 'Georg Fischer AG',
        'value': 2400,
        'color': 'blue',
    },
    {
        'name': 'Novartis AG',
        'value': 4567,
        'color': 'sky',
    },
    {
        'name': 'Geberit AG',
        'value': 1398,
        'color': 'indigo',
    },
    {
        'name': 'Roche Holding AG',
        'value': 9800,
        'color': 'violet',
    },
    {
        'name': 'Stadler Rail AG',
        'value': 3908,
        'color': 'purple',
    },
    {
        'name': 'Swatch Group Ord Shs. This is an edge case.',
        'value': 1908,
        'color': 'fuchsia',
    }
];

export const simpleStockData = [
    {
        name: 'Georg Fischer AG',
        value: '1,340',
        delta: '2.3%',
        deltaType: 'moderateIncrease',
    },
    {
        name: 'Novartis AG',
        value: '4,290',
        delta: '1.2%',
        deltaType: 'moderateDecrease',
    },
    {
        name: 'Geberit AG',
        value: '3,910',
        delta: '3.4%',
        deltaType: 'decrease',
    },
    {
        name: 'Roche Holding AG',
        value: '10,140',
        delta: '6.1%',
        deltaType: 'increase',
    },
    {
        name: 'Stadler Rail AG',
        value: '12,340',
        delta: '0.5%',
        deltaType: 'moderateDecrease',
    },
    {
        name: 'Swatch Group Ord Shs',
        value: '9,340',
        delta: '1.8%',
        deltaType: 'moderateIncrease',
    },
];
