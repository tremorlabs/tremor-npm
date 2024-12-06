import React from "react";

import { Card } from "components";

export const SimpleCard = (args: any) => (
  <Card {...args}>
    <p>23,000</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue
      blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.{" "}
    </p>
  </Card>
);
