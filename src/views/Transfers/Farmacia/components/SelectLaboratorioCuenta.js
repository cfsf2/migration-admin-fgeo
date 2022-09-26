import React, { useEffect } from "react";

import { Col, FormGroup, Input, Label } from "reactstrap";

const SelectDrogueria = ({
  transfer,
  handleInputNroCuenta,
  farmacia,
  laboratorio,
}) => {
  useEffect(() => {
    console.log(
      farmacia.nro_cuenta_laboratorio.find(
        (l) => l.laboratorio.id === laboratorio.id
      )
    );
    handleInputNroCuenta({
      target: {
        value: farmacia.nro_cuenta_laboratorio.find(
          (l) => l.laboratorio.id === laboratorio.id
        ).nro_cuenta,
      },
    });
  }, []);
  return (
    <>
      <Col md="3" xs="12">
        <FormGroup>
          <Label>N° de cuenta de Laboratorio</Label>
          <Input
            type="text"
            name="nro_cuenta_drogueria"
            value={transfer ? transfer.nro_cuenta_drogueria : undefined}
            onChange={handleInputNroCuenta}
          />
        </FormGroup>
      </Col>
    </>
  );
};

export default SelectDrogueria;
