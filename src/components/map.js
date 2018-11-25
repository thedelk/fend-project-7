import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/map-theme";

const MapContainer = props => {
  const {
    // deselectMarker,
    filterTerm,
    storeMarkers,
    google,
    markerDeactivate,
    mapCenter,
    markerInfoWindowShowing,
    markerSelected,
    onClickMarker,
    places,
    placeSelected,
    mapZoom
  } = props;

  const markerss = places
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <Marker
          // animation={google.maps.Animation.DROP}
          id={place.id}
          key={place.id}
          name={place.name}
          onClick={onClickMarker.bind(place)}
          // onClick={onClickMarker.bind(place)}
          // onClick={onClickMarker}
          position={place.position}
          ref={storeMarkers}
        />
      );
    });

  // If a place has been selected, the info window will show that place's information;
  // otherwise set the info window content to an empty string.
  // This is to prevent trying to retrieve this information when a place hasn't been
  // selected, which would result in an error.
  const infoWindowContent = placeSelected ? (
    <div>
      <h3>{placeSelected.name}</h3>
      <p>{placeSelected.id}</p>
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
      {markerss}
      <InfoWindow
        // marker={markerSelected}
        marker={placeSelected}
        onClose={markerDeactivate}
        visible={markerInfoWindowShowing}
      >
        <section>{infoWindowContent}</section>
      </InfoWindow>
      {/* {console.log("map render")} */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
