import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/map-theme";

const MapContainer = props => {
  const {
    // deselectMarker,
    // filterTerm,
    // getMarkers,
    google,
    mapCenter,
    // markerInfoWindowShowing,
    // markerSelected,
    placeList,
    // placeSelected,
    // selectMarker
    mapZoom
  } = props;

  const markers = placeList
    //   .filter(
    //     place =>
    //       place.venue.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    //   )
    .map(place => {
      return (
        <Marker
          //         animation={google.maps.Animation.DROP}
          key={place.id}
          name={place.name}
          //         onClick={selectMarker.bind(this)}
          position={place.position}
          //         ref={getMarkers}
        />
      );
    });

  // const infoWindowContent = placeSelected ? (
  //   <div>
  //     <h3>{placeSelected.name}</h3>
  //     <p>{placeSelected.id}</p>
  //   </div>
  // ) : (
  //   ""
  // );

  return (
    <Map
      disableDefaultUI={true}
      google={google}
      initialCenter={mapCenter}
      // onClick={deselectMarker.bind(this)}
      style={{
        height: "100%",
        width: "100%"
      }}
      styles={theme}
      zoom={mapZoom}
    >
      {markers}
      {/* <InfoWindow
        marker={markerSelected}
        onClose={deselectMarker}
        visible={markerInfoWindowShowing}
      >
      <section>Placeholder</section>
        <section>{infoWindowContent}</section>
      </InfoWindow> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
