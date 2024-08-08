import { Button, NumberInput } from "components";
import React from "react";

export const SimpleNumberInput = (args: any) => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onReset={() => setValue(0)}
        className="text-slate-500"
      >
        <p>Uncontrolled</p>
        <NumberInput {...args} onSubmit={(value: number) => alert(value)} />

        <p>Uncontrolled with defaultValue</p>
        <NumberInput {...args} defaultValue={123} onSubmit={(value: number) => alert(value)} />

        <p>Controlled without onValueChange</p>
        <NumberInput {...args} value={value} onSubmit={(value: number) => alert(value)} />

        <label htmlFor="a">
          <p>Controlled with onValueChange</p>
        </label>
        <NumberInput
          {...args}
          id={"a"}
          value={value}
          onValueChange={(e) => setValue(e)}
          onSubmit={(value: number) => alert(value)}
        />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <Button type="reset" variant="secondary" className="mt-2">
          Reset Input
        </Button>
      </form>
      <p>value: {value}</p>
    </>
  );
};

export const SimpleNumberInputControlled = (args: any) => {
  const [value, setValue] = React.useState(333);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="a">
          <p>Controlled with Intl.NumberFormat ptBR</p>
        </label>
        <NumberInput
          {...args}
          id={"a"}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          formatter={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })}
        />
        <label htmlFor="a">
          <p>Controlled with Intl.NumberFormat US</p>
        </label>
        <NumberInput
          {...args}
          id={"a"}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          formatter={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })}
        />

        <p>value: {value}</p>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </>
  );
};
