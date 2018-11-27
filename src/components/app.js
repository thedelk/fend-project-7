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
  // TODO: Store place details so marker infoWindows can access it to display
  // TODO: Make app accessible
  state = {
    filterTerm: "",
    filteredList: [],
    markerInfoWindowShowing: undefined,
    placeSelected: undefined,
    placeSelectedDetails: undefined
  };

  handleMarkerAnimation = () => {
    // If there is no place selected (meaning there is no active marker)
    if (!this.state.placeSelected) {
      // If there is still a marker bouncing
      // This will be true if a marker has recently been deactivated. Its
      // animation will still be set to true, so it needs to be turned off.
      if (this.props.markers.find(marker => marker.marker.animating === true)) {
        // If this is the case, find the marker and set its animation to null
        this.props.markers
          .find(marker => marker.marker.animating === true)
          .marker.setAnimation(window.google.maps.Animation.null);
      }
    } else {
      // Otherwise, there will be an active marker somewhere
      // If there is a marker bouncing
      // This will be true if a marker was already active but a different place
      // was selected
      if (this.props.markers.find(marker => marker.marker.animating === true)) {
        // Find the marker that is bouncing and set its animation to null
        this.props.markers
          .find(marker => marker.marker.animating === true)
          .marker.setAnimation(window.google.maps.Animation.null);
        // Find the new active place and make its marker bounce
        this.state.placeSelected.setAnimation(
          window.google.maps.Animation.BOUNCE
        );
      } else {
        // Otherwise, a place will be selected for the first time.
        // Make that place's marker bounce
        this.state.placeSelected.setAnimation(
          window.google.maps.Animation.BOUNCE
        );
      }
    }
  };

  markerActivate = (props, marker) => {
    // Open the place's info window, set it as selected
    this.setState(
      {
        markerInfoWindowShowing: true,
        placeSelected: marker,
        placeSelectedDetails: props
      },
      // Callback - after the place has been selected, determine
      // how its animation should be handled. Used as a callback
      // because this depends on the updated state.
      () => this.handleMarkerAnimation()
    );
  };

  markerDeactivate = () => {
    // Close the info window, deselect the place
    this.setState(
      {
        markerInfoWindowShowing: undefined,
        placeSelected: undefined,
        placeSelectedDetails: undefined
      },
      // Callback - after the place has been deselected, determine
      // how its animation should be handled. Used as a callback
      // because this depends on the updated state.
      () => this.handleMarkerAnimation()
    );
  };

  onClickPlace = (props, marker) => {
    // Search the "places" props for the Foursquare venue that has
    // the same id as the marker/list item selected.
    let details = this.props.places.find(place => props.id === place.id);

    // Clicking the already active place will deactivate it.
    // Otherwise, select this place and activate its marker.
    this.state.placeSelected === marker
      ? this.markerDeactivate()
      : this.markerActivate(details, marker);
  };

  filterList = filterTerm => {
    // Update the filter term based on user input and subsequently
    // write the remaining places to a new array.
    this.setState(
      {
        filterTerm: filterTerm,
        filteredList: this.props.places.filter(place => {
          return (
            place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
          );
        })
      },
      // Callback - after the list has been filtered, check if there is an
      // active place. If so, find out if it is in the newly filtered
      // list. If not, deselect the place and deactivate its marker.
      () => {
        if (this.state.placeSelected) {
          if (
            !this.state.filteredList
              .map(place => place.id)
              .includes(this.state.placeSelected.id)
          ) {
            this.markerDeactivate();
          }
        }
      }
    );
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
                filteredList={this.state.filteredList}
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
