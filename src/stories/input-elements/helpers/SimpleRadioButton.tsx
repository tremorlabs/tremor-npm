import React from "react";
import { RadioButton } from "components";

export function SimpleRadioButton() {
  const [value, setValue] = React.useState("no");
  return (
    <fieldset>
      <legend>Do you agree?</legend>
      <RadioButton
        name="agreed-to-terms"
        id="agreed-yes"
        value="yes"
        checked={value === "yes"}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />{" "}
      <label htmlFor="agreed-yes">Yes</label>
      <RadioButton
        name="agreed-to-terms"
        id="agreed-no"
        value="no"
        checked={value === "no"}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />{" "}
      <label htmlFor="agreed-no">No</label>
    </fieldset>
  );
}
