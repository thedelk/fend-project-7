import React, { Component } from "react";
import "../styles/css/layout.css";
import { GoogleApiWrapper } from "google-maps-react";
import { getPlacesData } from "../util/requests";
import { G_KEY } from "../util/auth.js";
import MapContainer from "./map";
import Sidebar from "./sidebar";
// import Header from "./header";

export class App extends Component {
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
    placeList: [],
    placeSelected: undefined
  };

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = () => {
    getPlacesData()
      .then(response => {
        // Store returned list of places in an array
        this.setState({
          placeList: response.response.groups[0].items
        });

        // Loop through each place and give it a Position key
        // so its respective InfoWindow knows where to mount
        this.setState({
          placeList: this.state.placeList.map(place => {
            return {
              ...place,
              position: {
                lat: place.venue.location.lat,
                lng: place.venue.location.lng
              }
            };
          })
        });
      })
      .catch(error => alert(`Error: ${error}`));
  };

  getMarkers = marker => {
    if (marker !== null) {
      this.setState(prevState => ({
        markerList: [...prevState.markerList, marker]
      }));
    }
  };

  filterList = filterTerm => {
    this.setState({
      filterTerm: filterTerm,
      filteredList: this.state.placeList.filter(place => {
        return (
          place.venue.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
        );
      })
    });
  };

  deselectMarker = () => {
    this.setState({
      markerInfoWindowShowing: false,
      markerSelected: undefined,
      // placeDetails: {},
      placeSelected: undefined
    });
  };

  selectMarker = (props, marker) => {
    // If a marker is already selected, clicking it again will deselect it
    if (this.state.markerSelected === marker) {
      this.deselectMarker();
    } else {
      // Clicking a marker will show its information window
      this.setState({
        markerInfoWindowShowing: true,
        markerSelected: marker,
        // placeDetails: {},
        placeSelected: props
      });
    }
  };

  selectListItem = listItem => {
    let thisMarker = this.state.markerList.find(
      marker => listItem.venue.id === marker.props.id
    );
    this.selectMarker(thisMarker.props, thisMarker.marker);
  };

  render() {
    const {
      filterTerm,
      filteredList,
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
        {/* <Header /> */}
        <main className="container" role="application">
          <Sidebar
            deselectMarker={this.deselectMarker}
            filterList={this.filterList.bind(this)}
            filterTerm={filterTerm}
            filteredList={filteredList}
            getMarkers={this.getMarkers}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            markerInfoWindowShowing={markerInfoWindowShowing}
            markerList={markerList}
            markerRef={this.getMarkerRef}
            markerSelected={markerSelected}
            placeDetails={placeDetails}
            placeList={placeList}
            placeSelected={placeSelected}
            selectListItem={this.selectListItem}
            selectMarker={this.selectMarker}
          />
          <div className="map">
            <MapContainer
              deselectMarker={this.deselectMarker}
              filterList={this.filterList.bind(this)}
              filterTerm={filterTerm}
              filteredList={filteredList}
              getMarkers={this.getMarkers}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              markerInfoWindowShowing={markerInfoWindowShowing}
              markerList={markerList}
              markerRef={this.getMarkerRef}
              markerSelected={markerSelected}
              placeDetails={placeDetails}
              placeList={placeList}
              placeSelected={placeSelected}
              selectMarker={this.selectMarker}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(App);
