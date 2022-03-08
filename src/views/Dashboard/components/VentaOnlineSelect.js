import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_FARMACIA } from "../../../redux/actions/farmaciaActions";

class VentaOnlineSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userprofile } = this.props.authReducer;
    if (this.state.perfil_farmageo) {
      this.props.UPDATE_FARMACIA({
        ...userprofile,
        perfil_farmageo: this.state.perfil_farmageo,
      });
    }
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { userprofile } = this.props.authReducer;
    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          zIndex: 99,
          borderRadius: 13,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          display: this.state.show ? "block" : "none",
          height: "100%",
        }}
      >
        {!userprofile ? null : (
          <form onSubmit={this.handleSubmit}>
            <div className="container-fluid">
              <div className="row pt-5">
                <div className="col-md-1"></div>
                <div className="col-md" align="left">
                  <h3>¿Cómo desea operar en Farmageo?</h3>
                  <input
                    type="radio"
                    name="perfil_farmageo"
                    value="vender_online"
                    className="mx-2 mt-3"
                    onChange={this.handleInputChange}
                    required
                    defaultChecked={
                      userprofile.perfil_farmageo === "vender_online"
                        ? true
                        : false
                    }
                  />
                  <label>Elijo vender online a través de Farmageo</label> <br />
                  <small
                    style={{
                      display: "block",
                      lineHeight: "0.5",
                      marginLeft: "35px",
                    }}
                  >
                    Quiero comercializar todos los packs precargados disponibles
                    y sumar los productos disponibles en mi farmacia
                  </small>
                  <br />
                  <input
                    type="radio"
                    name="perfil_farmageo"
                    value="solo_visible"
                    className="mx-2 mt-3"
                    onChange={this.handleInputChange}
                    required
                    defaultChecked={
                      userprofile.perfil_farmageo === "solo_visible"
                        ? true
                        : false
                    }
                  />
                  <label>
                    Elijo solo estar visible con mis datos completos, sin venta
                    online.
                  </label>
                  <small
                    style={{
                      display: "block",
                      lineHeight: "0.5",
                      marginLeft: "35px",
                    }}
                  >
                    Solo quiero estar presente y dejar mi información para que
                    se contacten de manera particular.
                  </small>
                  <br />
                  <input
                    type="radio"
                    name="perfil_farmageo"
                    value="no_visible"
                    className="mx-2 mt-3"
                    onChange={this.handleInputChange}
                    required
                    defaultChecked={
                      userprofile.perfil_farmageo === "no_visible"
                        ? true
                        : false
                    }
                  />
                  <label>Elijo no formar parte de Farmageo</label>
                  <small
                    style={{
                      display: "block",
                      lineHeight: "0.5",
                      marginLeft: "35px",
                    }}
                  >
                    No me interesa comercializar ni llevar adelante ninguna
                    operación desde la plataforma.
                  </small>
                  <br />
                </div>
                <div className="col-md-1"></div>
              </div>
              <div className="row pt-5" align="center">
                <div className="col">
                  <input
                    type="submit"
                    value="Confirmar"
                    className="btn btn-success my-5"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { authReducer: state.authReducer };
};

const mapDispatchToProps = { UPDATE_FARMACIA };

export default connect(mapStateToProps, mapDispatchToProps)(VentaOnlineSelect);
