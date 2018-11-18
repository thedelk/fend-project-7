import React, { Component } from "react";
import "../styles/app.css";
import { getPlacesData } from "../util/requests";
import MapContainer from "./map";
import Sidebar from "./sidebar";

export default class App extends Component {
  state = {
    placeSelected: null,
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    mapMarkerInfoWindowShowing: false,
    mapMarkerList: [],
    mapMarkerSelected: {},
    placeDetails: {},
    placeList: []
  };

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = () => {
    getPlacesData()
      .then(response => {
        this.setState({
          placeList: response.response.groups[0].items
        });

        let test = this.state.placeList.map(place => {
          return {
            ...place,
            position: {
              lat: place.venue.location.lat,
              lng: place.venue.location.lng
            }
          };
        });

        this.setState({
          placeList: test
        });
      })
      .catch(error => alert(`Error: ${error}`));
  };

  markerWasSelected = (props, marker) => {
    this.setState({
      placeDetails: {},
      placeSelected: props,
      mapMarkerSelected: marker,
      mapMarkerInfoWindowShowing: true
    });
  };

  render() {
    console.log("app render");
    console.log(this);

    const {
      mapCenter,
      mapMarkerInfoWindowShowing,
      mapMarkerList,
      mapMarkerSelected,
      mapZoom,
      placeDetails,
      placeList,
      placeSelected
    } = this.state;

    return (
      <div role="application">
        <main className="container">
          <Sidebar />
          <div className="col-map">
            <MapContainer
              mapMarkerList={mapMarkerList}
              placeList={placeList}
              markerWasSelected={this.markerWasSelected}
              mapMarkerSelected={mapMarkerSelected}
              mapZoom={mapZoom}
              markerRef={this.getMarkerRef}
              mapMarkerInfoWindowShowing={mapMarkerInfoWindowShowing}
              placeDetails={placeDetails}
              mapCenter={mapCenter}
              placeSelected={placeSelected}
            />
          </div>
        </main>
      </div>
    );
  }
}
