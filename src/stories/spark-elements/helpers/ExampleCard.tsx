import React from "react";
import { Card, Title } from "components";

const ExampleCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="w-96 flex items-center justify-between">
    <div>
      <Title>AAPL</Title>
      <span className="text-sm text-gray-500">Apple Inc.</span>
    </div>
    <div className="flex items-center gap-x-4">
      {children}
      <div className="text-right">
        <Title>196.26</Title>
        <span className="text-sm text-emerald-600">+2.69%</span>
      </div>
    </div>
  </Card>
);

export default ExampleCard;
