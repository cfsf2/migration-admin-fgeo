import React from "react";
import { Input, Label } from "reactstrap";

export default function Checkbox(props) {
  const { name, onChange, checked, label } = props;
  return (
    <>
      <Input
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <Label>{label}</Label>
    </>
  );
}
