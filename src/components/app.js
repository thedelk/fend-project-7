import React, { Component } from "react";
import "../styles/app.css";
import MapContainer from "./map";

export default class App extends Component {
  state = {
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapMarkerList: [],
    mapZoom: 12,
    placeList: [],
    placeSelected: null
  };

  render() {
    const {
      mapCenter,
      mapMarkerList,
      mapZoom,
      placeList,
      placeSelected
    } = this.state;

    return (
      <div className="col col-map">
        <MapContainer
          mapCenter={mapCenter}
          mapMarkerList={mapMarkerList}
          mapZoom={mapZoom}
          placeList={placeList}
          placeSelected={placeSelected}
        />
      </div>
    );
  }
}
