/* global google */
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
//import icon from "../../assets/images/icons/IconAppFamageo.png";
import icon from "../../assets/images/icons/ico-ubicacion.png";
import icon_amarillo from "../../assets/images/icons/icono-amarillo.png";
import icon_naranja from "../../assets/images/icons/icono-naranja.png";
import icon_gris from "../../assets/images/icons/icono-gris.png";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      items: null,
    };
    this.handleBuscarFarmacias = this.handleBuscarFarmacias.bind(this);
    this.handleVisita = this.handleVisita.bind(this);
  }

  async handleVisita(farmacia, estado) {
    this.props.handleVisita(farmacia, estado);
    await delay(1000);
    this.handleBuscarFarmacias();
  }

  handleBuscarFarmacias() {
    fetch("https://api.farmageo.com.ar/farmacias")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  componentDidMount = () => {
    this.handleBuscarFarmacias();
  };

  render() {
    return (
      <div className="map-container">
        {/*<div
          style={{
            backgroundColor: "#dbdbdb",
            height: "103px",
            width: "348px",
            position: "fixed",
            bottom: "50px",
            zIndex: 9999,
            border: "solid 1px gray",
          }}
        >
          <img src={icon_amarillo} alt="" style={{ width: 35 }} />
          <img src={icon} alt="" style={{ width: 30 }} />
          <img src={icon_gris} alt="" style={{ width: 30 }} />
        </div>*/}
        <Map
          google={this.props.google}
          className={"map"}
          zoom={4}
          initialCenter={this.props.center}
        >
          {this.state.items == null
            ? null
            : this.state.items.map((farmacia, i) => {
                return farmacia.perfil_farmageo === "vender_online" ? (
                  <Marker
                    onClick={this.onMarkerClick}
                    key={farmacia.id}
                    place_={farmacia}
                    position={{ lat: farmacia.lat, lng: farmacia.log }}
                    icon={{
                      url: icon,
                      anchor: new google.maps.Point(18, 18),
                      scaledSize: new google.maps.Size(36, 36),
                    }}
                  />
                ) : farmacia.perfil_farmageo == "solo_visible" ? (
                  <Marker
                    onClick={this.onMarkerClick}
                    key={farmacia.id}
                    place_={farmacia}
                    position={{ lat: farmacia.lat, lng: farmacia.log }}
                    icon={{
                      url: icon_amarillo,
                      anchor: new google.maps.Point(40, 40),
                      scaledSize: new google.maps.Size(60, 60),
                    }}
                  />
                ) : farmacia.perfil_farmageo == "no_visible" ? (
                  <Marker
                    onClick={this.onMarkerClick}
                    key={farmacia.id}
                    place_={farmacia}
                    position={{ lat: farmacia.lat, lng: farmacia.log }}
                  />
                ) : (
                  <Marker
                    onClick={this.onMarkerClick}
                    key={farmacia.id}
                    place_={farmacia}
                    position={{ lat: farmacia.lat, lng: farmacia.log }}
                    icon={{
                      url: icon_gris,
                      anchor: new google.maps.Point(40, 40),
                      scaledSize: new google.maps.Size(50, 50),
                    }}
                  />
                );
              })}
          {
            <InfoWindowEx
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.nombre}</h3>
                <p>
                  {this.state.selectedPlace.calle +
                    " " +
                    this.state.selectedPlace.numero}
                </p>
                <p>({this.state.selectedPlace.localidad})</p>
                <h5>
                  Perfil: <b>{this.state.selectedPlace.perfil_farmageo}</b>
                </h5>

                {/*  <button
                  type="button"
                  onClick={() =>
                                   this.handleVisita(this.state.selectedPlace, "avisitar")
                  }
                  className="btn"
                  style={{ backgroundColor: "orange" }}
                >
                  Visitar
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.handleVisita(this.state.selectedPlace, "visitado")
                  }
                  className="btn btn-warning"
                >
                  Visitado
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.handleVisita(this.state.selectedPlace, "")
                  }
                  className="btn btn-danger"
                >
                  Cancelar
                </button>*/}
              </div>
            </InfoWindowEx>
          }
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  //apiKey: "AIzaSyD_4xrDbxnc4N3KGZEXvT9ZFZu2cQbmCmU",
  apiKey: "AIzaSyD2Q_tdFCSznHIV32IEuLkUno2bzhy7518", //esta esta a nombre de Tecno.alarcon
})(MapContainer);
