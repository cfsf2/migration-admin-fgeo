import React from "react";
import { Input, Label } from "reactstrap";
import "./checkbox.scss";

export default function Checkbox(props) {
  const { name, onChange, checked, label } = props;
  return (
    <>
      <div className="checkbox_">
        <Input
          type="checkbox"
          name={name}
          onChange={onChange}
          checked={checked}
          className="checkbox_input"
        />
        <Label className="checkbox_label">{label}</Label>
      </div>
    </>
  );
}
