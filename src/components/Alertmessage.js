import React from "react";
import { UncontrolledAlert } from "reactstrap";

function Alertmessage(props) {
  if (props.error.errorCode && props.error.errorTitle) {
    return (
      <UncontrolledAlert color="danger">
        <b>{props.error.errorTitle}</b>
        <p>{props.error.errorMessage}</p>
      </UncontrolledAlert>
    );
  } else {
    if (props.title && props.text) {
      return (
        <UncontrolledAlert color={props.variant}>
          <b>{props.title}</b>
          <p>{props.text}</p>
        </UncontrolledAlert>
      );
    } else {
      return null;
    }
  }
}

export default Alertmessage;
