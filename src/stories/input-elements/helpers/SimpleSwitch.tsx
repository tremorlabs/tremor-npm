import { Button, Switch } from "components";
import React from "react";

export const SimpleSwitch = (args: any) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <form action="http://localhost:6006/" method="get" onReset={() => setChecked(false)}>
        <input type="hidden" name="path" value={"/docs/components-input-switch--docs"} />
        <Switch {...args} checked={checked} onChange={setChecked} />

        <div className="flex gap-4 mt-2">
          <Button type="submit" className="mt-2 w-fit">
            Submit
          </Button>

          <Button type="reset" className="mt-2 w-fit">
            Reset Input
          </Button>
        </div>
      </form>

      <p>{checked ? "On" : "Off"}</p>
    </div>
  );
};
