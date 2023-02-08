export const valueFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString() + " $";
};
