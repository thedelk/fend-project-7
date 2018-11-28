import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/map-theme";

const MapContainer = props => {
  const {
    filterTerm,
    storeMarkers,
    google,
    markerDeactivate,
    mapCenter,
    markerInfoWindowShowing,
    onClickPlace,
    places,
    placeSelected,
    placeSelectedDetails,
    mapZoom
  } = props;

  // Generate the markers based on user's input in the "Filter" box
  const markers = places
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <Marker
          animation={google.maps.Animation.DROP}
          id={place.id}
          key={place.id}
          name={place.name}
          onClick={onClickPlace.bind(place)}
          position={place.position}
          ref={storeMarkers}
        />
      );
    });

  function getInfo(detail) {
    let place = detail.location;
    let placeName = detail.name;
    let placeAddress = place.address ? place.address : "(No address listed)";
    let placeCity = place.city ? place.city : "(No city listed)";
    let placeState = place.state ? place.state : "(No state listed)";
    let placePostalCode = place.postalCode ? place.postalCode : "";

    return (
      <div>
        <h3>{placeName}</h3>
        <p>{placeAddress}</p>
        <p>
          {placeCity}, {placeState} {placePostalCode}
        </p>
      </div>
    );
  }

  return (
    <Map
      disableDefaultUI={true}
      google={google}
      initialCenter={mapCenter}
      onClick={markerDeactivate.bind(this)}
      style={{
        height: "100%",
        width: "100%"
      }}
      styles={theme}
      zoom={mapZoom}
    >
      {markers}
      <InfoWindow
        marker={placeSelected}
        onClose={markerDeactivate}
        visible={markerInfoWindowShowing}
      >
        <section>
          {placeSelectedDetails ? getInfo(placeSelectedDetails) : undefined}
        </section>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
