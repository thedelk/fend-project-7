import React, { Component } from "react";
import "../styles/css/layout.css";
// import { GoogleApiWrapper } from "google-maps-react";
// import { getPlacesData } from "../util/requests";
import Requests from "../util/requests";
// import { FS_URL } from "../util/auth";
// import { G_KEY } from "../util/auth.js";
import MapContainer from "./map";
import Sidebar from "./sidebar";
// import Header from "./header";
import axios from "axios";

const FS_URL = "https://api.foursquare.com/v2/venues/explore?";
const QUERY = "coffee";
const LOCATION = "Oklahoma City";
const VERSION = "20182507";
const FS_URL_FULL = FS_URL.concat(`${QUERY}&near=${LOCATION}&v=${VERSION}`);

// export class App extends Component {
export default class App extends Component {
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
    // placeList: [],
    placeSelected: undefined
  };

  // componentDidMount() {
  //   Requests.searchVenues()
  //     .then(results => {
  //       console.log(results);
  //       const { venues } = results.response;
  //       this.setState({
  //         placeList: venues.map(place => {
  //           return {
  //             ...place,
  //             position: {
  //               lat: place.location.lat,
  //               lng: place.location.lng
  //             }
  //           };
  //         })
  //       });
  //     })
  //     .catch(error => {
  //       console.log(
  //         "Error setting initial state in componentDidMount() [app.js]"
  //       );
  //       console.log(error);
  //     });
  // }

  // getPlacesInfo = () => {
  //   getPlaces()
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(`Error: ${error}`);
  //     });
  // };

  // TODO: Move data fetch into a higher-order component
  // getPlaces = () => {
  //   getPlacesData()
  //     .then(response => {
  //       // Store returned list of places in an array
  //       this.setState({
  //         placeList: response.response.groups[0].items
  //       });

  //       // Loop through each place and give it a Position key
  //       // so its respective InfoWindow knows where to mount
  //       this.setState({
  //         placeList: this.state.placeList.map(place => {
  //           return {
  //             ...place,
  //             position: {
  //               lat: place.venue.location.lat,
  //               lng: place.venue.location.lng
  //             }
  //           };
  //         })
  //       });
  //     })
  //     .catch(error => alert(`Error: ${error}`));
  // };

  // FIXME: Markers are re-added to markerList upon clearing a search
  getMarkers = marker => {
    // console.log(marker);
    // console.log(this.state);
    if (marker !== null) {
      this.setState(prevState => ({
        markerList: [...prevState.markerList, marker]
      }));
    }
  };

  // FIXME: If a marker is selected and its info window is showing,
  // filtering out the result from the list does not remove the
  // marker's associated info window
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

  deselectMarker = marker => {
    //
    // Temporary
    const animatingMarkers = this.state.markerList;
    animatingMarkers.forEach(m => m.marker.setAnimation(null));

    this.setState({
      markerInfoWindowShowing: false,
      // markerList: animatingMarkers,
      markerSelected: undefined,
      // placeDetails: {},
      placeSelected: undefined
    });
  };

  selectMarker = (props, marker) => {
    //
    // Temporary
    const bouncingMarkers = this.state.markerList;
    bouncingMarkers.forEach(staticMarker => {
      if (staticMarker.marker.id === marker.id) {
        staticMarker.marker.setAnimation(1);
      } else {
        staticMarker.marker.setAnimation(null);
      }
    });
    this.setState({
      markerList: bouncingMarkers
    });

    // If a marker is already selected, clicking it again will deselect it
    if (this.state.markerSelected === marker) {
      this.deselectMarker(marker);
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

  // FIXME: Associated marker bounces only on the second click of its
  // list item (so, on "deselect")
  selectListItem = listItem => {
    // In the list of markers, find the one that has the same ID
    // as the place that was selected in the list
    let thisMarker = this.state.markerList.find(
      marker => listItem.venue.id === marker.props.id
    );

    // Now that the appropriate marker has been identified,
    // handle the functions associated with selecting a marker
    // (e.g. showing its info window, making it bounce)
    this.selectMarker(thisMarker.props, thisMarker.marker);
  };

  render() {
    // console.log(this.state);
    // console.log(this.props);
    console.log("render app");

    const {
      //   filterTerm,
      //   filteredList,
      //   markerInfoWindowShowing,
      //   markerList,
      //   markerSelected,
      //   placeDetails,
      // placeList,
      //   placeSelected
      mapCenter,
      mapZoom
    } = this.state;

    const { placeList } = this.props;

    if (!placeList) {
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
            <Sidebar
            // deselectMarker={this.deselectMarker}
            // filterList={this.filterList.bind(this)}
            // filterTerm={filterTerm}
            // filteredList={filteredList}
            // getMarkers={this.getMarkers}
            // mapCenter={mapCenter}
            // mapZoom={mapZoom}
            // markerInfoWindowShowing={markerInfoWindowShowing}
            // markerList={markerList}
            // markerRef={this.getMarkerRef}
            // markerSelected={markerSelected}
            // placeDetails={placeDetails}
            // placeList={placeList}
            // placeSelected={placeSelected}
            // selectListItem={this.selectListItem}
            // selectMarker={this.selectMarker}
            />
            <div className="map">
              <MapContainer
                // deselectMarker={this.deselectMarker}
                // filterList={this.filterList.bind(this)}
                // filterTerm={filterTerm}
                // filteredList={filteredList}
                // getMarkers={this.getMarkers}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                // markerInfoWindowShowing={markerInfoWindowShowing}
                // markerList={markerList}
                // markerSelected={markerSelected}
                // placeDetails={placeDetails}
                placeList={placeList}
                // placeSelected={placeSelected}
                // selectMarker={this.selectMarker}
              />
            </div>
          </main>
        </div>
      );
    }
  }
}

// export default GoogleApiWrapper({
//   apiKey: G_KEY
// })(App);
