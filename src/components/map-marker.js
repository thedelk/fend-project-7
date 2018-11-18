import React, { Component } from "react";
import { Marker, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";

export const MapMarker = props => {
  const { mapCenter, mapMarkerList, mapZoom, placeList, placeSelected } = props;

  const markers = mapMarkerList.forEach(marker => {
    return <Marker key={marker.venue.id} />;
  });
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapMarker);
