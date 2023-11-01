import React, { useRef } from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { farmageo_api } from "../../../../config";

import { Col, FormGroup, Input, Label } from "reactstrap";
import { Row } from "react-bootstrap";

import { connect } from "react-redux";

import { GET_FARMACIA } from "../../../../redux/actions/farmaciaActions";

const SelectNroCuenta = (props) => {
  const {
    transfer,
    handleInputNroCuenta,
    farmacia,
    laboratorio,
    descuento,
    calcularPrecio,
  } = props;

  const [cuentas, setCuentas] = useState([]);
  const labRef = useRef();
  labRef.current = laboratorio;
  const getCuentas = (lid) => {
    axios
      .post(farmageo_api + "/farmacia/nro_cuenta", {
        id_farmacia: farmacia.id,
        id_laboratorio: lid,
      })
      .then((res) => {
        setCuentas(() => res.data);
        if (
          labRef.current.modalidad_entrega.id_a === "DIRECTO" &&
          res.data.nro_cuenta
        ) {
          handleInputNroCuenta({
            target: {
              name: "nro_cuenta_drogueria",
              value: res.data.nro_cuenta,
            },
          });
        }
      });
  };

  useEffect(() => {
    if (laboratorio.id) {
      getCuentas(laboratorio.id);
    }
  }, [farmacia.id, laboratorio.id]);

  useEffect(() => {
    props.GET_FARMACIA(farmacia.usuario);
  }, []);

  const handleVisibilityChange = async () => {
    if (document.hidden) {
    } else {
      await props.GET_FARMACIA(farmacia.usuario);
      const valor = labRef.current.id;
      getCuentas(valor);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!laboratorio.id) return <></>;

  return (
    <>
      <Row style={{ color: "#20a8d8", fontSize: 18 }}>
        {laboratorio.modalidad_entrega.id_a !== "DIRECTO" ? (
          <Col md="4" xs="12">
            <FormGroup>
              <Label className="select_cuenta_label">Cuenta</Label>

              <Input
                type="select"
                name="id_drogueria"
                value={transfer ? transfer.drogueria_nombre : undefined}
                onChange={handleInputNroCuenta}
                style={{ padding: 0 }}
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

            <p style={{ fontSize: "0.8rem" }}>
              <Link to="/Pantalla/FARMACIA_DROGUERIA_NRO_CUENTA" target="blank">
                Para agregar otras cuentas haga click aquí.
              </Link>{" "}
              Luego de agregar su número de cuenta actualice la pantalla.
              <span style={{cursor:"pointer"}} className="actualizar_nro_cuenta" onClick={() => window.location.reload()}>
                (Actualizar)
              </span>{" "}
            </p>
          </Col>
        ) : (
          <></>
        )}
        <Col md="3" xs="12">
          <FormGroup>
            <Label className="select_cuenta_label">N° de cuenta</Label>
            <Input
              type="text"
              name="nro_cuenta_drogueria"
              value={transfer.nro_cuenta_drogueria}
              disabled={laboratorio.modalidad_entrega.id_a !== "DIRECTO"}
              bsSize="small"
            />
          </FormGroup>
        </Col>{" "}
        <Col md="4" xs="12">
          {calcularPrecio === "s" || true ? (
            <FormGroup style={{ display: "flex", flexDirection: "column" }}>
              <Label className="select_cuenta_label">Descuento Droguería</Label>
              {descuento} %
            </FormGroup>
          ) : (
            <></>
          )}
        </Col>{" "}
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

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
    farmaciaReducer: state.farmaciaReducer,
  };
};

const mapDispatchToProps = {
  GET_FARMACIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNroCuenta);

export { SelectNroCuenta };
