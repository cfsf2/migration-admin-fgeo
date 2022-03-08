import React, { Component } from "react";
import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export default class ImportarCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }
  handleOpenDialog = async (e) => {
    // Note that the ref is set async, so it might be null at some point
    //alert("asd")
    if (buttonRef.current) {
      await buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    this.props.handleResponse(data);
    //console.log('---------------------------')
    //console.log(data)
    //console.log('---------------------------')
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    //console.log('---------------------------')
    //console.log(data)
    //console.log('---------------------------')
  };

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: this.props.disabled,
      });
    }
  }

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: "40%",
                paddingLeft: 0,
                paddingRight: 0,
              }}
              className="btn btn-dark"
              disabled={this.state.disabled}
            >
              Archivo csv...
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#ccc",
                // height: 45,
                lineHeight: 2.5,
                // marginTop: 5,
                // marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: "60%",
              }}
            >
              {file && file.name}
            </div>
            {/*<button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              className="btn btn-danger"
              onClick={this.handleRemoveFile}
            >
              Cancelar
            </button>*/}
          </aside>
        )}
      </CSVReader>
    );
  }
}
