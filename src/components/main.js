import React, { Component } from "react";
import App from "./app";
import Requests from "../util/requests";

export default class Main extends Component {
  state = {
    placeList: []
  };

  componentDidMount() {
    Requests.searchVenues()
      .then(results => {
        console.log(results);
        const { venues } = results.response;
        this.setState({
          placeList: venues.map(place => {
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
        console.log(
          "Error setting initial state in componentDidMount() [app.js]"
        );
        console.log(error);
      });
  }

  render() {
    console.log(this.state);

    return <App placeList={this.state.placeList} />;
  }
}
