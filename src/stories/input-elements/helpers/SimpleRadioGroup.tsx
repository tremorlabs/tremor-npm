import { RadioGroup } from "@headlessui/react";
import { RadioGroupOption, RadioGroupLabel } from "components";
import React, { useState } from "react";

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
    </div>
  );
}
