import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { google_api } from "../../../../config";

export function Mapa(props) {
  const { data, cab, display } = props;

  const lat_ = cab.latitud_id_a;
  const l = cab.id_a + "_mapa_latitud";
  const long_ = cab.longitud_id_a;
  const o = cab.id_a + "_mapa_longitud";

  const zoom = cab.mapa_zoom ? Number(cab.mapa_zoom) : lat_ && long_ ? 15 : 3;

  const latm =
    data.reduce((agg, d) => {
      return Number(agg) + Number(d[l]); // Number(d[lat_]);
    }, 0) / data.length;

  const lngm =
    data.reduce((agg, d) => {
      return Number(agg) + Number(d[o]); // Number(d[long_]);
    }, 0) / data.length;

  return (
    <div
      className="map_container"
      style={{ height: cab.height || "200px", display }}
    >
      <Map
        containerStyle={{ width: "100%" }}
        google={props.google}
        className="map"
        zoom={zoom}
        // centerAroundCurrentLocation={true}
        initialCenter={{
          lat: latm ?? -38.416097,
          lng: lngm ?? -63.616672,
        }}
        center={{
          lat: latm ?? -38.416097,
          lng: lngm ?? -63.616672,
        }}
        style={{ flex: 1, display: "flex", width: "100%" }}
        // onClick={onMapClicked}
      >
        {data.map((d, i) => {
          const lat__ = Number(d[l]);
          const long__ = Number(d[o]);

          return (
            <Marker
              key={lat__ + long__}
              position={{
                lat: lat__,
                lng: long__,
              }}
              icon={{
                url: require("../../../../assets/images/Logo-farmageo-borde.svg"), //icon,
                anchor: new props.google.maps.Point(25, 25),
                scaledSize: new props.google.maps.Size(25, 25),
              }}
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${lat__},${long__}`
                );
              }}
            />
          );
        // <InfoWindow marker={true} />
        })}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: google_api,
})(Mapa);
