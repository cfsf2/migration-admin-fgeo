import React from "react";

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

export function CambiarPassword(props) {
  const {
    errors,
    newPass,
    setNewPass,
    setErrors,
    allowChange,
    setAllowChange,
  } = props;

  const [confirmPassword, setConfirmPassword] = React.useState("");

  const Validate = (e) => {
    setErrors(() => errors.filter((field) => field !== "password"));
    if (newPass !== confirmPassword) {
      setErrors(errors.concat("password"));
    }
    if (newPass === "") {
      setErrors(errors.concat("password"));
    }
  };

  React.useEffect(() => {
    if (allowChange) {
      Validate();
    }

    return;
  }, [newPass, confirmPassword, allowChange]);

  return (
    <>
      {!allowChange ? (
        <Col>
          <Button
            color="info"
            style={{ margin: "1.3rem" }}
            onClick={() => setAllowChange(!allowChange)}
          >
            {" "}
            Quiero Cambiar el Password
          </Button>
        </Col>
      ) : (
        <>
          <Col>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                autoComplete="off"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                className={`${
                  errors.includes("password") ? "createuser_errorField" : ""
                }`}
                value={newPass}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Confirmar Contraseña</Label>
              <Input
                type="password"
                name="confirmpassword"
                autoComplete="off"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className={`${
                  errors.includes("password") ? "createuser_errorField" : ""
                }`}
                value={confirmPassword}
              />
            </FormGroup>
          </Col>
        </>
      )}
    </>
  );
}
