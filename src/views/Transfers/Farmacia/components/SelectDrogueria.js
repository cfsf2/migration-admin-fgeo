import React from "react";

import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const SelectDrogueria = ({ transfer, handleInputNroCuenta, farmacia }) => {
  return (
    <>
      <Col md="4" xs="12">
        <FormGroup>
          <Label>Elegir Droguería</Label>

          <Input
            type="select"
            name="id_drogueria"
            value={transfer ? transfer.drogueria_nombre : undefined}
            onChange={handleInputNroCuenta}
          >
            <option value={undefined}>seleccionar...</option>

            {farmacia.nro_cuenta_drogueria.map((cta) => {
              return (
                <option value={cta.drogueria.id} key={cta.drogueria.id}>
                  {cta.drogueria.nombre} - {cta.nro_cuenta}
                </option>
              );
            })}
          </Input>
        </FormGroup>

        <Link to="/Pantalla/FARMACIA_DROGUERIA_NRO_CUENTA">
          <p style={{ fontSize: "1rem" }}>
            Para agregar otras cuentas haga click aqui.{" "}
          </p>
        </Link>
      </Col>

      <Col md="3" xs="12">
        <FormGroup>
          <Label>N° de cuenta de Droguería</Label>
          <Input
            type="text"
            name="nro_cuenta_drogueria"
            value={transfer ? transfer.nro_cuenta_drogueria : undefined}
            disabled
          />
        </FormGroup>
      </Col>
    </>
  );
};

export default SelectDrogueria;
