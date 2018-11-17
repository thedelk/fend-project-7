import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";

export class MapContainer extends Component {
  render() {
    const {
      mapCenter,
      mapMarkerList,
      mapZoom,
      placesList,
      placeSelected
    } = this.props;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClick}
        style={{
          position: "relative",
          display: "inherit",
          height: "100%",
          width: "100%"
        }}
        zoom={mapZoom}
        initialCenter={mapCenter}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
