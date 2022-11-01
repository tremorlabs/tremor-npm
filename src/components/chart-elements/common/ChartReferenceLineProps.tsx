import { ReactElement } from 'react';

export interface ChartReferenceLineProps {
  x?: string | number;
  y?: string | number;
  alwaysShow?: boolean;
  label: string | number | ReactElement;
  isFront?: boolean;
  strokeWidth?: number;
  segment?: [
    {
      x: string | number,
      y: string | number,
    },
    {
      x: string | number,
      y: string | number,
    }
  ];
  strokeDasharray?: string;
  stroke?: string;
}
