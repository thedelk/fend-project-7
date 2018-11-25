import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
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
    filterTerm: "",
    filteredList: [],
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    markerInfoWindowShowing: false,
    markerList: [],
    markerSelected: undefined,
    // placeDetails: {},
    placeSelected: undefined
  };

  handleMarkerAnimation = () => {
    // Logic to handle turning on/off marker animation upon selection
  };

  markerActivate = (props, marker) => {
    this.setState({
      markerInfoWindowShowing: true,
      // markerSelected: marker,
      placeSelected: marker
      //   // markerSelected: marker,
      //   placeSelected: props
    });
  };

  markerDeactivate = () => {
    this.setState({
      markerInfoWindowShowing: false,
      // markerSelected: undefined,
      placeSelected: undefined
    });
  };

  onClickMarker = (props, marker) => {
    // onClickMarker = place => {
    // console.log(props);
    // console.log(marker);
    // console.log(this.props.markers);
    // console.log(place);

    // let myMarker = this.props.places.filter(
    //   marker => place.id === marker.id
    // )[0];
    // let myMarker = this.props.places.filter(uhhh => uhhh.id === marker.id)[0];

    // console.log(myMarker);

    // this.setState({
    //   placeSelected: place
    // });

    // What to do when a marker is clicked.
    if (this.state.placeSelected === marker) {
      // Clicking the already active marker will deactivate it.
      this.markerDeactivate(marker);
    } else {
      // Otherwise, select this place and activate its marker.
      this.markerActivate(props, marker);
    }
  };

  // FIXME: Associated marker bounces only on the second click of its
  // list item (so, on "deselect")
  onClickListItem = listItem => {
    // In the list of markers, find the one that has the same ID
    // as the place that was selected in the list.
    let thisMarker = this.props.places.filter(
      marker => listItem.id === marker.id
    )[0];
    console.log(thisMarker);

    // Now that the associated marker has been found,
    // handle the functions associated with selecting a marker
    // (e.g. showing its info window, making it bounce).
    // if (this.state.markerSelected === thisMarker.marker) {
    //   this.markerDeactivate(thisMarker.marker);
    // } else {
    //   this.markerActivate(thisMarker.props, thisMarker.marker);
    // }
  };

  // storeMarkers = marker => {
  // console.log(marker);
  // Add the markers to the state array only if the array is empty (meaning
  // this hasn't been done yet). Without the conditional, using the filter
  // and then clearing it will add extra copies of the markers to the array.
  // if (this.state.markerList.length === 0) {
  //   this.setState(prevState => ({
  //     markerList: [...prevState.markerList, marker]
  //   }));
  // }
  // };

  // FIXME: If a marker is selected and its info window is showing,
  // filtering out the result from the list does not remove the
  // marker's associated info window
  filterList = filterTerm => {
    this.setState({
      filterTerm: filterTerm,
      filteredList: this.props.placeList.filter(place => {
        return place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0;
      })
    });
  };

  render() {
    console.log("app render");
    // console.log(this);

    const {
      filterTerm,
      // filteredList,
      markerInfoWindowShowing,
      markerSelected,
      //   placeDetails,
      placeSelected,
      mapCenter,
      mapZoom
    } = this.state;

    const { placeList, markers, places, storeMarkers } = this.props;

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
              <Sidebar
                deselectMarker={this.deselectMarker}
                filterList={this.filterList.bind(this)}
                filterTerm={filterTerm}
                // filteredList={filteredList}
                // getMarkers={this.getMarkers}
                // mapCenter={mapCenter}
                // mapZoom={mapZoom}
                // markerInfoWindowShowing={markerInfoWindowShowing}
                markers={markers}
                // markers={markers}
                // markerRef={this.getMarkerRef}
                // markerSelected={markerSelected}
                onClickMarker={this.onClickMarker}
                onClickListItem={this.onClickListItem}
                places={places}
                placeSelected={placeSelected}
                // selectListItem={this.selectListItem}
                // selectMarker={this.selectMarker}
              />
            ) : (
              <div>
                <h1>Loading...</h1>
              </div>
            )}
            <div className="map">
              <MapContainer
                // deselectMarker={this.deselectMarker}
                // filterList={this.filterList.bind(this)}
                filterTerm={filterTerm}
                // filteredList={filteredList}
                markers={markers}
                // storeMarkers={this.storeMarkers}
                storeMarkers={storeMarkers}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                markerActivate={this.markerActivate}
                markerDeactivate={this.markerDeactivate}
                markerInfoWindowShowing={markerInfoWindowShowing}
                // markerList={markerList}
                markerSelected={markerSelected}
                onClickMarker={this.onClickMarker}
                // placeDetails={placeDetails}
                places={places}
                placeList={placeList}
                placeSelected={placeSelected}
                // selectMarker={this.selectMarker}
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
