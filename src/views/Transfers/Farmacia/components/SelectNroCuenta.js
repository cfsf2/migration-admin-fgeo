import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { farmageo_api } from "../../../../config";

import { Col, FormGroup, Input, Label } from "reactstrap";
import { Row } from "react-bootstrap";

const SelectNroCuenta = ({
  transfer,
  handleInputNroCuenta,
  farmacia,
  laboratorio,
}) => {
  const [cuentas, setCuentas] = useState([]);
  useEffect(() => {
    if (laboratorio.id) {
      axios
        .post(farmageo_api + "/farmacia/nro_cuenta", {
          id_farmacia: farmacia.id,
          id_laboratorio: laboratorio.id,
        })
        .then((res) => {
          setCuentas(() => res.data);
        });
    }
  }, [farmacia.id, laboratorio.id]);
  if (!laboratorio.id) return <></>;
  console.log(laboratorio);
  return (
    <>
      <Row style={{ color: "#20a8d8", fontSize: 18 }}>
        {laboratorio.modalidad_entrega.id_a !== "DIRECTO" ? (
          <Col md="4" xs="12">
            <FormGroup>
              <Label>Elegir Cuenta</Label>

              <Input
                type="select"
                name="id_drogueria"
                value={transfer ? transfer.drogueria_nombre : undefined}
                onChange={handleInputNroCuenta}
              >
                <option value={undefined}>seleccionar...</option>

                {cuentas.map((cta) => {
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
        ) : (
          <></>
        )}
        <Col md="3" xs="12">
          <FormGroup>
            <Label>N° de cuenta de Droguería</Label>
            <Input
              type="text"
              name="nro_cuenta_drogueria"
              value={transfer ? transfer.nro_cuenta_drogueria : undefined}
              disabled={laboratorio.modalidad_entrega.id_a !== "DIRECTO"}
            />
          </FormGroup>
        </Col>{" "}
        <Col md="4" xs="12">
          <FormGroup>
            <Label>Laboratorio elegido</Label>
            <Input
              type="text"
              value={laboratorio != null ? laboratorio.nombre : undefined}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {laboratorio.modalidad_entrega.id_a === "ALGUNAS_DROGUERIAS" &&
          cuentas.length === 0 ? (
            <p>
              Este laboratorio acepta cuentas de{" "}
              {laboratorio.droguerias?.map(
                (d, i) =>
                  `${d.nombre}${
                    laboratorio.droguerias.length === i + 1 ? "." : ", "
                  } `
              )}
            </p>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SelectNroCuenta;
