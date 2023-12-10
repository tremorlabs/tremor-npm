import React, { useState } from "react";
import { RadioGroup, RadioGroupOption, RadioGroupLabel } from "components";

export function SimpleRadioGroup() {
  return (
    <RadioGroup defaultValue="startups">
      <div className="flex flex-col gap-4">
        <RadioGroupOption value="startups">
          <RadioGroupLabel>Startups</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupOption value="enterprise">
          <RadioGroupLabel>Enterprise</RadioGroupLabel>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  );
}

export function SimpleRadioGroupControlled() {
  const [selected, setSelected] = useState("startup");
  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      <div className="flex flex-col gap-4">
        <RadioGroupOption value="startups">
          <RadioGroupLabel>Startups</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupOption value="enterprise">
          <RadioGroupLabel>Enterprise</RadioGroupLabel>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  );
}
