"use client";
import BaseInput from "assets/BaseInput";
import React, { useRef } from "react";
import type { BaseInputProps } from "assets/BaseInput";
import { makeClassName, tremorTwMerge } from "lib";
import { ArrowDownIcon, ArrowUpIcon } from "assets";

export type NumberInputProps = Omit<BaseInputProps, "type" | "numberControllers" | "onChange"> & {
  min?: string;
  max?: string;
  step?: string;
  onChange?: (value: number, evt?: React.ChangeEvent<HTMLInputElement>) => void;
};

const makeNumberInputClassName = makeClassName("NumberInput");

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props) => {
  const handleChange = (value: number, evt?: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(value, evt);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <BaseInput
      type="number"
      {...props}
      makeInputClassName={makeNumberInputClassName}
      numberControllers={
        <div
          className={tremorTwMerge(
            "flex justify-center align-middle flex-col border-l px-2",
            "border-tremor-border dark:border-dark-tremor-border",
          )}
        >
          <ArrowUpIcon
            onClick={() => {
              inputRef.current?.stepUp();
              handleChange(parseFloat(inputRef.current?.value ?? ""));
            }}
            data-testid="arrow-up"
            width="15px"
            height="15px"
            className="cursor-pointer"
          />

          <hr className="absolute w-10 right-0 border-tremor-border dark:border-dark-tremor-border" />
          <ArrowDownIcon
            onClick={() => {
              inputRef.current?.stepDown();
              handleChange(parseFloat(inputRef.current?.value ?? ""));
            }}
            data-testid="arrow-down"
            width="15px"
            height="15px"
            className="cursor-pointer"
          />
        </div>
      }
      ref={inputRef}
      onChange={(e) => {
        handleChange(parseFloat(e.target.value), e);
      }}
    />
  );
});

NumberInput.displayName = "NumberInput";

export default NumberInput;
