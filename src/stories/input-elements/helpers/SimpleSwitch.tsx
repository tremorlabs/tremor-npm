import { Button, Switch } from "components";
import React from "react";

export const SimpleSwitch = (args: any) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <div className="space-y-4">
      <form action="http://localhost:6006/" method="get" onReset={() => setChecked(true)}>
        <input type="hidden" name="path" value={"/docs/components-input-switch--docs"} />
        <p>Uncontrolled</p>
        <Switch {...args} />
        <p>Uncontrolled with defaultChecked</p>
        <Switch {...args} defaultChecked={true} />
        <p>Controlled without onChange</p>
        <Switch {...args} checked={checked} />
        <label htmlFor="a">
          <p>Controlled</p>
        </label>
        <Switch {...args} id={"a"} checked={checked} onChange={setChecked} name="switch" />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <Button type="reset" className="mt-2">
          Reset Input
        </Button>
      </form>
      <p>checked: {checked}</p>
    </div>
  );
};
