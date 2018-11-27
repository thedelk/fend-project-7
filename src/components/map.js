// @Author:             Ryan Delk
// @Date:               2018-11-25 14:08:56
// @Last Modified by:   Ryan Delk
// @Last Modified time: 2018-11-25 14:08:56

import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/map-theme";

const MapContainer = props => {
  const {
    filteredList,
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

  // TODO: Utilize getPlacesData() request to obtain more specific place details
  function getInfo(detail) {
    // console.log(detail);

    let place = detail.location;
    let placeName = detail.name;
    let placeAddress = place.address ? place.address : "(No address listed)";
    // let placeAddress = place.address;
    let placeCity = place.city ? place.city : "(No city listed)";
    let placeState = place.state ? place.state : "(No state listed)";
    let placePostalCode = place.postalCode ? place.postalCode : "";

    // let placeName = placeSelectedDetails.location.name;
    // console.log(props.placeSelectedDetails.location.name);
    // let placeAddress = place.address;
    // let placeCity = place.city;

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

  // If a place has been selected, the info window will show that place's information;
  // otherwise set the info window content to an empty string.
  // This is to prevent trying to retrieve this information when a place hasn't been
  // selected, which would result in an error.
  const infoWindowContent = placeSelectedDetails ? (
    <div className="info-window">
      <h3>{placeSelectedDetails.name}</h3>
      <p>{placeSelectedDetails.location.address}</p>
      <p>
        {`${placeSelectedDetails.location.city}, ${
          placeSelectedDetails.location.state
        } ${placeSelectedDetails.location.postalCode}`}
      </p>
      <p>{placeSelectedDetails.location.country}</p>
    </div>
  ) : (
    ""
  );

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
        {/* <section>{infoWindowContent}</section> */}
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
