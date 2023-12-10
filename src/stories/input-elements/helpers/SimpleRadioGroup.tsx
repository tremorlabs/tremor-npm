import React, { useState } from "react";
import { RadioGroup, RadioGroupOption, RadioGroupLabel } from "components";

export function SimpleRadioGroup() {
  return (
    <RadioGroup defaultValue="startups">
      <RadioGroupOption value="startups">
        <RadioGroupLabel>Startups</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption value="enterprise">
        <RadioGroupLabel>Enterprise</RadioGroupLabel>
      </RadioGroupOption>
    </RadioGroup>
  );
}

export function SimpleRadioGroupControlled() {
  const [selected, setSelected] = useState("startup");
  const [selected2, setSelected2] = useState("startup");
  return (
    <div className="space-y-6">
      <RadioGroup value={selected} onValueChange={setSelected}>
        <RadioGroupOption value="startups">
          <RadioGroupLabel>Startups</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupOption value="enterprise">
          <RadioGroupLabel>Enterprise</RadioGroupLabel>
        </RadioGroupOption>
      </RadioGroup>
      <RadioGroup value={selected2} onValueChange={setSelected2} name="test">
        <RadioGroupOption value="startups" id="test"></RadioGroupOption>
      </RadioGroup>
    </div>
  );
}
