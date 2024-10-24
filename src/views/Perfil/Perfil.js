import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Tooltip,
} from "reactstrap";
import { connect } from "react-redux";
import { UPDATE_FARMACIA } from "../../redux/actions/farmaciaActions";
import Uploader from "../../components/Uploader";
import MapContainer from "../../components/MapContainer";
import DisplayImage from "../../components/DisplayImage";
import { Link } from "react-router-dom";

const Perfil = ({ authReducer, farmaciaReducer, UPDATE_FARMACIA }) => {
  const [farmaciaProfile, setFarmaciaProfile] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    setFarmaciaProfile(authReducer.userprofile);
  }, [authReducer.userprofile]);

  const handleInputChange = (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFarmaciaProfile({
      ...farmaciaProfile,
      [name]: value,
    });
  };

  const handleEditProfile = () => {
    UPDATE_FARMACIA(farmaciaProfile);
  };

  const handleEditImagen = (_imagen) => {
    setFarmaciaProfile({
      ...farmaciaProfile,
      imagen: _imagen,
    });
  };

  const handlePositionMap = (lat, log) => {
    setFarmaciaProfile({
      ...farmaciaProfile,
      lat,
      log,
    });
  };

  if (!authReducer.userprofile) return <>Error</>;
  const {
    telefono,
    cuit,
    telefonofijo,
    calle,
    numero,
    provincia,
    cp,
    localidad,
    costoenvio,
    tiempotardanza,
    nombrefarmaceutico,
    matricula,
    direccioncompleta,
    nombre,
    whatsapp,
    email,
    facebook,
    instagran,
    web,
    nohagoenvios,
    perfil_farmageo,
  } = authReducer.userprofile;

  if (!farmaciaReducer.load) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="animated fadeIn">
      <Row style={{ marginBottom: 10 }}>
        <Col>
          <Button
            style={{
              float: "right",
              backgroundColor: "#00D579",
              color: "white",
            }}
            onClick={handleEditProfile}
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Perfil</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      id="nombre"
                      defaultValue={nombre}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col className="col-8">
                        <Label htmlFor="calle">Dirección</Label>
                        <Input
                          type="text"
                          placeholder="Direccion"
                          id="calle"
                          name="calle"
                          defaultValue={calle}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col className="col-4">
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          type="text"
                          id="numero"
                          name="numero"
                          defaultValue={numero}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md="6" xs="12" className="my-2">
                        <Label htmlFor="Telefono">Teléfono</Label>
                        <Input
                          type="text"
                          placeholder="Teléfono"
                          id="Telefono"
                          name="telefono"
                          defaultValue={telefono}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md="6" xs="12" className="my-2">
                        <Label htmlFor="Cuit">CUIT</Label>
                        <Input
                          type="text"
                          placeholder="CIUT"
                          id="cuit"
                          name="cuit"
                          defaultValue={cuit}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md="4" xs="12" className="my-2">
                        <Label htmlFor="localidad">Localidad</Label>
                        <Input
                          type="text"
                          placeholder="Localidad"
                          id="Localidad"
                          name="localidad"
                          defaultValue={localidad}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md="4" xs="12" className="my-2">
                        <Label htmlFor="provincia">Provincia</Label>
                        <Input
                          type="text"
                          placeholder="Provincia"
                          id="provincia"
                          name="provincia"
                          defaultValue={provincia}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md="4" xs="12" className="my-2">
                        <Label htmlFor="cp">CP</Label>
                        <Input
                          type="text"
                          id="cp"
                          defaultValue={cp}
                          name="cp"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md="12" className="my-2">
                        <MapContainer
                          zoom={18}
                          lat={farmaciaProfile?.lat}
                          log={farmaciaProfile?.log}
                          height="146px"
                          width="100%"
                          position="relative"
                          onChange={handlePositionMap}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Card>
                      <CardHeader>
                        <strong>Imagen destacada</strong>
                      </CardHeader>
                      <CardBody>
                        <DisplayImage />
                        <Uploader
                          handleEditImagen={handleEditImagen}
                          isPerfil={true}
                        />
                      </CardBody>
                    </Card>
                    <div style={{ textAlign: "center" }}>
                      <Button color="info" id="button_nro_drogueria">
                        <Link
                          to="/Pantalla/FARMACIA_DROGUERIA_NRO_CUENTA"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Número de cuenta de drogueria
                        </Link>
                      </Button>
                      <Tooltip
                        isOpen={tooltipOpen}
                        placement="bottom"
                        target="button_nro_drogueria"
                        toggle={() => {
                          setTooltipOpen(!tooltipOpen);
                        }}
                      >
                        Complete aquí los datos requeridos para realizar
                        transfers de manera satisfactoria
                      </Tooltip>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Configuración de envíos</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col xs="6" md="6">
                  <Label htmlFor="nohagoenvios">No hago envíos</Label>
                </Col>
                <Col xs="6" md="6">
                  <Input
                    type="checkbox"
                    id="nohagoenvios"
                    name="nohagoenvios"
                    onChange={handleInputChange}
                    defaultChecked={nohagoenvios != null ? nohagoenvios : false}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="tiempotardanza">Tiempo de tardanza</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    type="select"
                    id="tiempotardanza"
                    name="tiempotardanza"
                    defaultValue={tiempotardanza}
                    onChange={handleInputChange}
                  >
                    <option value="15min - 30min">15min - 30min </option>
                    <option value="30min - 45min">30min - 45min</option>
                    <option value="45min - 60min">45min - 60min </option>
                    <option value="60min - 75min">60min - 75min</option>
                    <option value="75min - 120min">75min - 120min</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="costoenvio">Costo de Envío</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="costoenvio"
                    name="costoenvio"
                    placeholder="$0"
                    defaultValue={costoenvio}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Redes Sociales</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="facebook">Link de Facebook</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="facebook"
                    name="facebook"
                    placeholder=""
                    defaultValue={facebook}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="instagran">Link de Instagram</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="instagran"
                    name="instagran"
                    placeholder=""
                    defaultValue={instagran}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="web">Pagina web</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="web"
                    name="web"
                    placeholder=""
                    defaultValue={web}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Datos de la Farmacia</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="nombrefarmaceutico">Nombre del Farmacéutico</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="nombrefarmaceutico"
                    name="nombrefarmaceutico"
                    defaultValue={nombrefarmaceutico}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="matricula">Matrícula</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="matricula"
                    name="matricula"
                    placeholder="xxxxx"
                    defaultValue={matricula}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="telefonofijo">Teléfono Fijo</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="number"
                    id="telefonofijo"
                    name="telefonofijo"
                    placeholder=""
                    defaultValue={telefonofijo}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="direccioncompleta">Ubicación</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="direccioncompleta"
                    name="direccioncompleta"
                    placeholder="ingresar domicilio..."
                    defaultValue={direccioncompleta}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="whatsapp">WhatsApp (sin 0 ni 15)</Label>
                </Col>
                <Col xs="12" md="6">
                  <Row>
                    <Col align="center">
                      <Row>
                        <Col className="col-3">
                          <p className="pt-2 ph-0 mh-0">+549</p>
                        </Col>
                        <Col className="col-9">
                          <Input
                            type="number"
                            id="whatsapp"
                            name="whatsapp"
                            className="d-inline"
                            placeholder="341xxxxxxx"
                            defaultValue={whatsapp}
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="email">Email</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="user@mail.com"
                    defaultValue={email}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Venta Online</strong>
            </CardHeader>
            <CardBody>
              <input
                type="radio"
                name="perfil_farmageo"
                value="vender_online"
                className="mx-2 mt-3"
                onChange={handleInputChange}
                required
                defaultChecked={perfil_farmageo === "vender_online" ? true : false}
              />
              <label>Elijo vender online a través de Farmageo</label>

              <br />

              <input
                type="radio"
                name="perfil_farmageo"
                value="solo_visible"
                className="mx-2 mt-3"
                onChange={handleInputChange}
                defaultChecked={perfil_farmageo === "solo_visible" ? true : false}
                required
              />
              <label>
                Elijo solo estar visible con mis datos completos, sin venta online.
              </label>

              <br />

              <input
                type="radio"
                name="perfil_farmageo"
                value="no_visible"
                className="mx-2 mt-3"
                onChange={handleInputChange}
                defaultChecked={perfil_farmageo === "no_visible" ? true : false}
                required
              />
              <label>Elijo no formar parte de Farmageo</label>
              <br />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col className="mb-3">
          <Button
            style={{
              float: "right",
              backgroundColor: "#00D579",
              color: "white",
            }}
            onClick={handleEditProfile}
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    farmaciaReducer: state.farmaciaReducer,
  };
};

export default connect(mapStateToProps, { UPDATE_FARMACIA })(Perfil);
