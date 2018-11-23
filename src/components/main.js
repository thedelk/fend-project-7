import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import Requests from "../util/requests";
import App from "./app";

export class Main extends Component {
  // TODO: Implement static placeholder data if the data fetch fails
  state = {
    placeList: [],
    // TODO: Change render to include an "else if" that changes the return
    // HTML to let the user know there was an issue (maybe remove the alert)
    // in the request's error catch
    error: false
  };

  componentDidMount() {
    Requests.searchVenues()
      .then(results => {
        this.setState({
          placeList: results.response.venues.map(place => {
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

  render() {
    if (this.state.placeList.length === 0) {
      // Don't render the component until the data has been fetched
      return (
        <div>
          <h1>Loading</h1>
          <p>Fetching map data...</p>
        </div>
      );
    } else {
      // When the data is ready, render App and pass the places down as props
      return <App placeList={this.state.placeList} {...this.state} />;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: G_KEY
})(Main);
