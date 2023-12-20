export const valueFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString() + " $";
};

export const categoryFormatter = (value: string) => {
  return value.toUpperCase();
};
