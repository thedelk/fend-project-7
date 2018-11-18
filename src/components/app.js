import React, { Component } from "react";
import "../styles/app.css";
import { getPlacesData } from "../util/requests";
import MapContainer from "./map";
import Sidebar from "./sidebar";

export default class App extends Component {
  state = {
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    markerInfoWindowShowing: false,
    markerList: [],
    markerSelected: {},
    placeDetails: {},
    placeList: [],
    placeSelected: null
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
      markerInfoWindowShowing: true,
      markerSelected: marker,
      placeDetails: {},
      placeSelected: props
    });
  };

  render() {
    const {
      mapCenter,
      mapZoom,
      markerInfoWindowShowing,
      markerList,
      markerSelected,
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
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              markerInfoWindowShowing={markerInfoWindowShowing}
              markerList={markerList}
              markerRef={this.getMarkerRef}
              markerSelected={markerSelected}
              markerWasSelected={this.markerWasSelected}
              placeDetails={placeDetails}
              placeList={placeList}
              placeSelected={placeSelected}
            />
          </div>
        </main>
      </div>
    );
  }
}
