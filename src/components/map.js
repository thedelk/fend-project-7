import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/theme";

const MapContainer = props => {
  const {
    deselectMarker,
    clickedMarker,
    google,
    mapCenter,
    mapZoom,
    markerInfoWindowShowing,
    markerList,
    markerRef,
    markerSelected,
    placeList,
    placeSelected
  } = props;

  const markers = placeList.map(place => {
    return (
      <Marker
        key={place.venue.id}
        name={place.name}
        onClick={clickedMarker.bind(this)}
        position={place.position}
      />
    );
  });

  return (
    <Map
      google={google}
      onready={console.log("render map.js")}
      onClick={deselectMarker}
      style={{
        // position: "relative",
        // display: "inherit",
        height: "100%",
        width: "100%"
      }}
      zoom={mapZoom}
      initialCenter={mapCenter}
      styles={theme}
      disableDefaultUI={true}
    >
      {markers}
      {/* {placeList.map(place => {
        console.log(this);
        return (
          <Marker
            className="marker"
            // key={place.venue.id}
            key={place.name}
            // id={place.venue.id}
            onClick={markerWasSelected.bind(this)}
            // onClick={console.log("refresh?")}
            name={place.name}
            // position={{
            //   lat: place.venue.location.lat,
            //   lng: place.venue.location.lng
            // }}
            position={{
              lat: place.position.lat,
              lng: place.position.lng
            }}
          />
        );
      })} */}
      <InfoWindow
        visible={markerInfoWindowShowing}
        marker={markerSelected}
        onClose={deselectMarker}
      >
        <section>
          <div>Title</div>
        </section>
      </InfoWindow>
    </Map>
  );
};
// }

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
