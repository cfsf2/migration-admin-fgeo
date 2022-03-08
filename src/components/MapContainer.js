import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(t, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.onChange(lat, lng)
        /*this.setState(previousState => {
          return {
            markers: [
              ...previousState.markers,
              {
                title: "",
                name: "",
                position: { lat, lng }
              }
            ]
          };
          
        });*/
    }


    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    render() {
        if (!this.props.google) {
            return <div>Cargando mapa...</div>;
        }

        return (
            <div
                style={{
                    border: "solid 1px #c9c9c9",
                    position: this.props.position,
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                <Map
                    style={{}}
                    google={this.props.google}
                    zoom={this.props.zoom}
                    initialCenter={{ lat: this.props.lat, lng: this.props.log }}
                    onClick={this.onClick}
                >
                    <Marker
                        position={{ lat: this.props.lat, lng: this.props.log }}
                        onClick={this.onMarkerClick}
                        name={this.props.namelocation}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyBZ7-k763QmTCxIQR_GiiMD0HmnaYPWvvo"
})(MapContainer);
