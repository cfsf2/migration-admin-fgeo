import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  CardImg,
  CardFooter,
} from "reactstrap";

import { GET_LABORATORIOS } from "../../../redux/actions/transfersActions";
import { farmageo_api } from "../../../config";
import { image_path_server } from "../../../config";

export default function SeleccionLab(props) {
  const { usuario, setUsuario } = props;
  const [labs, setLabs] = React.useState([]);
  const [selectedLab, setSelectedLab] = React.useState({});

  const handleChange = (e) => {
    const labid = e.target.value;
    setSelectedLab(() => {
      return labs.filter((lab) => lab._id === labid)[0];
    });
    setUsuario(() => {
      return { ...usuario, labid };
    });
  };

  React.useEffect(() => {
    axios({
      method: "get",
      url: farmageo_api + "/laboratorios",
    }).then((res) => {
      setLabs(() => res.data);
    });

    return;
  }, []);

  return (
    <>
      <Card>
        <CardHeader>Seleccione el Laboratorio a Demostrar</CardHeader>
        <Row className="createuser_lab">
          <Col>
            <Input type="select" onChange={handleChange} value={usuario.labid}>
              <option disabled selected value={""}>
                ---Seleccione un Laboratorio---
              </option>
              {labs.map((lab) => {
                return (
                  <option key={lab._id} value={lab._id}>
                    {lab.nombre}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col className="createuser_lab_imagecol">
            {selectedLab && selectedLab.imagen ? (
              <img src={image_path_server + selectedLab.imagen} height="100" />
            ) : null}
          </Col>
        </Row>
      </Card>
    </>
  );
}
