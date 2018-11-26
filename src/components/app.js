// @Author:             Ryan Delk
// @Date:               2018-11-25 14:08:50
// @Last Modified by:   Ryan Delk
// @Last Modified time: 2018-11-25 14:08:50

import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import "../styles/css/layout.css";
import MapContainer from "./map";
import Sidebar from "./sidebar";
// import Header from "./header";

export class App extends Component {
  // TODO: Configure active marker animation
  // TODO: Store place details so marker infoWindows can access it to display
  // TODO: Make app accessible
  state = {
    animating: false,
    filterTerm: "",
    filteredList: [],
    markerInfoWindowShowing: false,
    placeSelected: undefined,
    placeSelectedDetails: undefined
  };

  handleMarkerAnimation = () => {
    // console.log(this.state.placeSelected);
    // this.state.placeSelected.setAnimation(window.google.maps.Animation.BOUNCE);

    // console.log(
    //   this.props.markers.find(marker => marker.marker.animating === true).marker
    // this.props.markers
    // );

    // console.log(bouncyBoy);

    console.log(this.state);
    if (!this.state.placeSelected) {
      console.log(this.state);
      if (this.props.markers.find(marker => marker.marker.animating === true)) {
        console.log(this.props.markers);
        let bouncyBoy = this.props.markers.find(
          marker => marker.marker.animating === true
        ).marker;
        console.log(bouncyBoy);
        bouncyBoy.setAnimation(window.google.maps.Animation.null);
      }
    } else {
      console.log(this.state);
      if (this.props.markers.find(marker => marker.marker.animating === true)) {
        console.log(this.state);
        let bouncyBoy = this.props.markers.find(
          marker => marker.marker.animating === true
        ).marker;
        bouncyBoy.setAnimation(window.google.maps.Animation.null);
        this.state.placeSelected.setAnimation(
          window.google.maps.Animation.BOUNCE
        );
      } else {
        console.log(this.state);
        this.state.placeSelected.setAnimation(
          window.google.maps.Animation.BOUNCE
        );
      }
    }
  };

  markerActivate = (props, marker) => {
    console.log(marker);
    this.setState(
      {
        markerInfoWindowShowing: true,
        placeSelected: marker,
        placeSelectedDetails: props
      },
      () => this.handleMarkerAnimation()
    );
  };

  markerDeactivate = () => {
    this.setState(
      {
        markerInfoWindowShowing: false,
        placeSelected: undefined
      },
      () => this.handleMarkerAnimation()
    );

    // this.props.markers
    //   .find(marker => marker.marker.animating === true)
    //   .marker.setAnimation(window.google.maps.Animation.null);
  };

  onClickPlace = (props, marker) => {
    // Search the "places" props for the Foursquare venue that has
    // the same id as the marker/list item selected
    let details = this.props.places.find(place => props.id === place.id);

    // Clicking the already active place will deactivate it.
    // Otherwise, select this place and activate its marker.
    this.state.placeSelected === marker
      ? this.markerDeactivate()
      : this.markerActivate(details, marker);
  };

  // FIXME: If a marker is selected and its info window is showing,
  // filtering out the result from the list does not remove the
  // marker's associated info window
  filterList = filterTerm => {
    this.setState({
      filterTerm: filterTerm,
      filteredList: this.props.places.filter(place => {
        return place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0;
      })
    });
  };

  render() {
    const { mapCenter, mapZoom, markers, places, storeMarkers } = this.props;

    if (!places) {
      return (
        <div>
          <h1>Loading</h1>
          <p>Fetching map data...</p>
        </div>
      );
    } else {
      return (
        <div role="application">
          {/* <Header /> */}
          <main className="container" role="application">
            {markers.length > 0 ? (
              <div className="sidebar">
                <Sidebar
                  filterList={this.filterList.bind(this)}
                  filterTerm={this.state.filterTerm}
                  markers={markers}
                  onClickPlace={this.onClickPlace}
                  places={places}
                  placeSelected={this.state.placeSelected}
                />
              </div>
            ) : (
              <div className="sidebar">
                <h1>Loading...</h1>
              </div>
            )}
            <div className="map">
              <MapContainer
                filterTerm={this.state.filterTerm}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                markerActivate={this.markerActivate}
                markerDeactivate={this.markerDeactivate}
                markerInfoWindowShowing={this.state.markerInfoWindowShowing}
                markers={markers}
                onClickPlace={this.onClickPlace}
                placeSelected={this.state.placeSelected}
                placeSelectedDetails={this.state.placeSelectedDetails}
                places={places}
                storeMarkers={storeMarkers}
              />
            </div>
          </main>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(App);
