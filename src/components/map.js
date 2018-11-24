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
    markerActivate,
    markerDeactivate,
    mapCenter,
    markerInfoWindowShowing,
    markerSelected,
    onClickMarker,
    placeList,
    placeSelected,
    // selectMarker,
    mapZoom
  } = props;

  const markers = placeList
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
          // onClick={markerActivate.bind(this)}
          onClick={onClickMarker.bind(place)}
          position={place.position}
          ref={storeMarkers}
        />
      );
    });

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
      {markers}
      <InfoWindow
        marker={markerSelected}
        onClose={markerDeactivate}
        visible={markerInfoWindowShowing}
      >
        <section>{infoWindowContent}</section>
      </InfoWindow>
      {console.log("map render")}
      {/* {console.log(props)} */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
