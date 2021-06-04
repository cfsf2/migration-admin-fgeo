import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Form, Input } from "reactstrap";
import { ADD_UPDATE_IMAGE } from "../redux/actions/imageActions";
import { UPDATE_FARMACIA } from "../redux/actions/farmaciaActions";

import {
  //wp_api,
  farmageo_api,
  //wp_api_auth
} from "../config";

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      farmaciaProfile: null,
      imagen: null,
    };
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  componentDidMount() {
    this.setState({
      farmaciaProfile: this.props.authReducer.userprofile,
    });
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.imagen[0]);
    axios
      .post(farmageo_api + "/imagenes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        /*
        data:
            Bucket: "farmageo"
            ETag: ""bfeece721960de3bff6348efd8f4bfb2""
            Key: "farmacias/1586742858645-lg.png"
            Location: "https://farmageo.s3.amazonaws.com/farmacias/1586742858645-lg.png"
            key: "farmacias/1586742858645-lg.png"      
      */
        if (this.props.isPerfil) {
          this.props.ADD_UPDATE_IMAGE(response.data.Key);
        }

        this.props.handleEditImagen(response.data.Key);
        console.log(response);
      })
      .catch((error) => {
        // handle your error
        console.log(error);
      });
  };

  handleFileUpload = (event) => {
    this.setState({ imagen: event.target.files });
  };

  handleEditProfile() {
    console.log({
      ...this.state.farmaciaProfile,
      imagen: this.state.imagen,
    });
  }

  render() {
    const disabled = this.state.imagen == "" || this.state.imagen == null;

    return (
      <Form onSubmit={this.submitFile}>
        <Input
          width="100%"
          type="file"
          size="sm"
          onChange={this.handleFileUpload}
        />
        <Button
          style={{ marginTop: 10 }}
          className="form-control form-control-sm"
          size="sm"
          type="submit"
          disabled={disabled}
        >
          Subir imagen seleccionada!
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imagen: state.imageReducer.imagen,
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = {
  ADD_UPDATE_IMAGE,
  UPDATE_FARMACIA,
};
export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
