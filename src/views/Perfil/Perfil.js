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
import '../Perfil/Perfil.scss';

const Perfil = ({ authReducer, farmaciaReducer, UPDATE_FARMACIA }) => {
  const [farmaciaProfile, setFarmaciaProfile] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const whatsappMesaAyuda = "https://wa.me/5493415112948";

  useEffect(() => {
    setFarmaciaProfile(authReducer.userprofile);
  }, [authReducer.userprofile]);

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;

    setFarmaciaProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditProfile = () => {
    UPDATE_FARMACIA(farmaciaProfile);
  };

  const handleEditImagen = (_imagen) => {
    setFarmaciaProfile((prev) => ({
      ...prev,
      imagen: _imagen,
    }));
  };

  const handlePositionMap = (lat, log) => {
    setFarmaciaProfile((prev) => ({
      ...prev,
      lat,
      log,
    }));
  };

  if (!authReducer.userprofile) return <>Error</>;
  if (!farmaciaReducer.load || !farmaciaProfile) {
    return <p>Cargando perfil...</p>;
  }

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
    instagram,
    web,
    perfil_farmageo,
  } = authReducer.userprofile;

  return (
    <div className="animated fadeIn">
      <Row className="mb-3">
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

      <Row className="mb-4">
        <Col xs="12">
          <Card>
            <CardHeader>
              <strong>Perfil</strong>
            </CardHeader>

            <CardBody>
              {/*
                =====================================================
                BLOQUE EDITABLE ORIGINAL (DESHABILITADO TEMPORALMENTE)
                =====================================================
                Se deja comentado por si en el futuro se requiere volver
                a permitir la edición desde esta pantalla.
              */}

              {/*
              <Row>
                <Col xs="12" lg="7">
                  <Row>
                    <Col md="12" className="mb-3">
                      <Label>Nombre</Label>
                      <Input
                        type="text"
                        name="nombre"
                        defaultValue={nombre}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="8" className="mb-3">
                      <Label>Dirección</Label>
                      <Input
                        type="text"
                        name="calle"
                        defaultValue={calle}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label>Número</Label>
                      <Input
                        type="text"
                        name="numero"
                        defaultValue={numero}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="6" className="mb-3">
                      <Label>Teléfono</Label>
                      <Input
                        type="text"
                        name="telefono"
                        defaultValue={telefono}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="6" className="mb-3">
                      <Label>CUIT</Label>
                      <Input
                        type="text"
                        name="cuit"
                        defaultValue={cuit}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label>Localidad</Label>
                      <Input
                        type="text"
                        name="localidad"
                        defaultValue={localidad}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label>Provincia</Label>
                      <Input
                        type="text"
                        name="provincia"
                        defaultValue={provincia}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label>CP</Label>
                      <Input
                        type="text"
                        name="cp"
                        defaultValue={cp}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md="12" className="mb-2">
                      <Label>Ubicación en mapa</Label>
                      <MapContainer
                        zoom={18}
                        lat={farmaciaProfile?.lat}
                        log={farmaciaProfile?.log}
                        height="220px"
                        width="100%"
                        position="relative"
                        onChange={handlePositionMap}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xs="12" lg="5">
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
                </Col>
              </Row>
              */}

              {/*
                ============================
                BLOQUE ACTUAL (SOLO LECTURA)
                ============================
              */}

              <Row>
                <Col xs="12" lg="7">
                  <Row>
                    <Col md="12" className="mb-3">
                      <Label className="font-weight-bold">Nombre</Label>
                      <div className="readonly-field">{nombre || "-"}</div>
                    </Col>

                    <Col md="8" className="mb-3">
                      <Label className="font-weight-bold">Dirección</Label>
                      <div className="readonly-field">{calle || "-"}</div>
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label className="font-weight-bold">Número</Label>
                      <div className="readonly-field">{numero || "-"}</div>
                    </Col>

                    <Col md="6" className="mb-3">
                      <Label className="font-weight-bold">Teléfono</Label>
                      <div className="readonly-field">{telefono || "-"}</div>
                    </Col>

                    <Col md="6" className="mb-3">
                      <Label className="font-weight-bold">CUIT</Label>
                      <div className="readonly-field">{cuit || "-"}</div>
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label className="font-weight-bold">Localidad</Label>
                      <div className="readonly-field">{localidad || "-"}</div>
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label className="font-weight-bold">Provincia</Label>
                      <div className="readonly-field">{provincia || "-"}</div>
                    </Col>

                    <Col md="4" className="mb-3">
                      <Label className="font-weight-bold">CP</Label>
                      <div className="readonly-field">{cp || "-"}</div>
                    </Col>

                    <Col md="12" className="mb-2">
                      <Label className="font-weight-bold">Ubicación en mapa</Label>
                      <div style={{ borderRadius: "4px", overflow: "hidden" }}>
                        <MapContainer
                          zoom={18}
                          lat={farmaciaProfile?.lat}
                          log={farmaciaProfile?.log}
                          height="220px"
                          width="100%"
                          position="relative"
                          onChange={() => {}}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xs="12" lg="5" className="mt-4 mt-lg-0">
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

                  <div style={{ textAlign: "center", marginTop: "20px" }}>
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
                      Complete aquí los datos requeridos para realizar transfers
                      de manera satisfactoria
                    </Tooltip>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs="12" md="6" className="mb-4 mb-md-0">
          <Card className="h-100">
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
                    checked={!Boolean(farmaciaProfile.envios)}
                    onChange={(e) => {
                      const checked = e.target.checked;

                      setFarmaciaProfile((prev) => ({
                        ...prev,
                        nohagoenvios: checked,
                        envios: !checked,
                      }));
                    }}
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
                    <option value="15min - 30min">15min - 30min</option>
                    <option value="30min - 45min">30min - 45min</option>
                    <option value="45min - 60min">45min - 60min</option>
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
          <Card className="h-100">
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
                    defaultValue={facebook}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="instagram">Link de Instagram</Label>
                </Col>
                <Col xs="12" md="6">
                  <Input
                    type="text"
                    id="instagram"
                    name="instagram"
                    defaultValue={instagram}
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
                    defaultValue={web}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/*
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Datos de la Farmacia</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="nombrefarmaceutico">
                    Nombre del Farmacéutico
                  </Label>
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
        */}
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Datos de la Farmacia</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="6">
                  <Label>Nombre del Farmacéutico</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {nombrefarmaceutico || "-"}
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label>Matrícula</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {matricula || "-"}
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label>Teléfono Fijo</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {telefonofijo || "-"}
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label>Ubicación</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {direccioncompleta || "-"}
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label>WhatsApp</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {whatsapp ? `+549 ${whatsapp}` : "-"}
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label>Email</Label>
                </Col>
                <Col xs="12" md="6">
                  <p className="form-control-plaintext">
                    {email || "-"}
                  </p>
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs="12" md="6">
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
        </Col> */}
      </Row>

      <Row className="mb-4">
        <Col xs="12">
          <div
            style={{
              textAlign: "center",
              padding: "14px 18px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              color: "#2171a3",
              fontWeight: "700",
            }}
          >
            <span>Para modificar otro dato contáctese con Mesa de Ayuda al </span>

            <a
              href={whatsappMesaAyuda}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              3415112948
              <i
                style={{ color: "#25D366", fontWeight: "600" }}
                className="fa fa-whatsapp"
              ></i>
            </a>
          </div>
        </Col>
      </Row>

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