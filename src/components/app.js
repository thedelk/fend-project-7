import React, { Component } from "react";
import "../styles/app.css";
import MapContainer from "./map";

export default class App extends Component {
  state = {
    places: [],
    markers: [],
    selectedPlace: null
  };

  render() {
    return (
      <div className="col col-map">
        <MapContainer />
      </div>
    );
  }
}
