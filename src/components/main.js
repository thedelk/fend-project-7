import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import Request from "../util/requests";
import Loading from "./loading";
import Error from "./error";
import App from "./app";

export class Main extends Component {
  state = {
    places: [],
    markers: [],
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    error: false
  };

  componentDidMount() {
    Request.getPlaces()
      .then(results => {
        this.setState({
          places: results.response.venues.map(place => {
            return {
              ...place,
              position: {
                lat: place.location.lat,
                lng: place.location.lng
              }
            };
          })
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        console.log(
          "Error setting initial state in componentDidMount() [app.js]"
        );
        console.log(error);
      });
  }

  storeMarkers = marker => {
    // Add the markers to the state array only if the array is empty (meaning
    // this hasn't been done yet). Without the conditional, using the filter
    // and then clearing it will add extra copies of the markers to the array.
    if (this.state.markers.length === 0) {
      this.setState(prevState => ({
        markers: [...prevState.markers, marker]
      }));
    }
  };

  render() {
    if (this.state.places.length === 0 && this.state.error === false) {
      // Don't render the component until the data has been fetched
      return <Loading />;
    } else if (this.state.error === true) {
      return <Error />;
    } else {
      // When the data is ready, render App and pass the places down as props
      return <App storeMarkers={this.storeMarkers} {...this.state} />;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(Main);
