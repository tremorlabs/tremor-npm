import { Button, TextInput } from "components";
import React from "react";

export const SimpleTextInput = (args: any) => {
  const [value, setValue] = React.useState("");
  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          alert(value);
          e.preventDefault();
        }}
        onReset={() => setValue("")}
      >
        <p>Uncontrolled</p>
        <TextInput {...args} />
        <p>Uncontrolled with defaultValue</p>
        <TextInput {...args} defaultValue="hello" />
        <p>Conrolled without onChange</p>
        <TextInput {...args} value={value} />
        <label htmlFor="a">
          <p>Controlled with on Change</p>
        </label>
        <TextInput {...args} id={"a"} value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="a">
          <p>Controlled with onValueChange</p>
        </label>
        <TextInput {...args} id={"a"} value={value} onValueChange={setValue} />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <Button type="reset" className="mt-2">
          Reset Input
        </Button>
      </form>
      <p>value: {value}</p>
    </div>
  );
};
