import React from "react";
import Button from "@mui/material/Button";
import { Link } from "@material-ui/core";

const BotonLink = () => {
  return (
    <>
      <Button variant="contained">
        <Link href="#" underline="none">
          ALGUN LADO
        </Link>
      </Button>
    </>
  );
};

export default BotonLink;
