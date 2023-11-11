import { Card, Slider } from "components";
import React from "react";

export const SimpleSlider = (args: any) => {
  const [value, setValue] = React.useState([10]);

  return (
    <Card className="h-44">
      <Slider {...args} value={value} onValueChange={setValue} />
      <span>{value}</span>
    </Card>
  );
};
