import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/theme";

const MapContainer = props => {
  console.log("in mapContainer");
  console.log(props);

  const {
    google,
    mapCenter,
    mapZoom,
    markerInfoWindowShowing,
    markerList,
    markerRef,
    markerSelected,
    markerWasSelected,
    placeList,
    placeSelected
  } = props;

  const markers = placeList.map(place => {
    return (
      <Marker
        className="marker"
        key={place.venue.id}
        name={place.name}
        onClick={props.markerWasSelected.bind(this)}
        position={place.position}
      />
    );
  });

  return (
    <Map
      google={google}
      onready={console.log("render map.js")}
      // onClick={this.onMapClick}
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
      {console.log(props)}
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
      <InfoWindow visible={markerInfoWindowShowing} marker={markerSelected}>
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
