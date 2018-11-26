// @Author:             Ryan Delk
// @Date:               2018-11-25 14:05:53
// @Last Modified by:   Ryan Delk
// @Last Modified time: 2018-11-25 14:05:53

import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import Request from "../util/requests";
import App from "./app";

export class Main extends Component {
  // TODO: Implement static placeholder data if the data fetch fails
  state = {
    places: [],
    markers: [],
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    // TODO: Change render to include an "else if" that changes the return
    // HTML to let the user know there was an issue (maybe remove the alert)
    // in the request's error catch
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
        // alert(
        //   "Error fetching data. Please check your internet connection, or try again later."
        // );
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
    console.log("render main");
    if (this.state.places.length === 0) {
      // Don't render the component until the data has been fetched
      return (
        <div>
          <h1>Loading</h1>
          <p>Fetching map data...</p>
        </div>
      );
    } else {
      // When the data is ready, render App and pass the places down as props
      return <App storeMarkers={this.storeMarkers} {...this.state} />;
      // return (
      //   <div>
      //     <h1>Done!</h1>
      //     {/* {this.state.places.map(place => (
      //       <div key={place.id}>
      //         <h2>{place.name}</h2>
      //         <p>{place.id}</p>
      //         <p />
      //       </div>
      //     ))} */}
      //   </div>
      // );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(Main);
