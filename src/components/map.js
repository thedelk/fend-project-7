import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import theme from "../styles/theme";

const MapContainer = props => {
  const {
    deselectMarker,
    filterTerm,
    // filteredList,
    // getMarkers,
    google,
    mapCenter,
    mapZoom,
    markerInfoWindowShowing,
    // markerList,
    // markerRef,
    markerSelected,
    placeList,
    // placeSelected,
    selectMarker
  } = props;

  const markers = placeList
    .filter(
      place =>
        place.venue.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <Marker
          // getMarkers={this.getMarkers(place.venue.id)}
          id={place.venue.id}
          key={place.venue.id}
          name={place.venue.name}
          onClick={selectMarker.bind(this)}
          position={place.position}
        />
      );
    });

  console.log(props);

  return (
    <Map
      google={google}
      onClick={deselectMarker}
      style={{
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
        marker={markerSelected}
        onClose={deselectMarker}
        visible={markerInfoWindowShowing}
      >
        <section>
          <div>Title</div>
        </section>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(MapContainer);
