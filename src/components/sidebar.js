import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import "../styles/css/sidebar.css";

export const Sidebar = props => {
  const {
    filterList,
    filterTerm,
    markers,
    onClickListItem,
    onClickMarker,
    places
  } = props;

  // Render the list of places only if the markerList array has been populated.
  // The list is dependent upon the MapContainer component completing to store
  // the markers. Because of that, the first state of this component is rendered
  // with an empty "markerList" array, which makes it more difficult to marry
  // the list items with their respective markers.
  // if (markerList.length > 0) {
  const listItems = places
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      // console.log(markers);
      let thisMarker = markers.find(marker => place.id === marker.props.id);
      // console.log(place);
      // console.log(thisMarker);
      // console.log(thisMarker.props);
      return (
        <li
          className="place"
          key={place.id}
          // onClick={onClickListItem.bind(this, place)}
          // onClick={onClickMarker.bind(this, place)}
          // onClick={onClickMarker.bind(place, thisMarker)}
          onClick={onClickMarker.bind(
            this,
            thisMarker.props,
            thisMarker.marker
          )}
        >
          {place.name}
        </li>
      );
    });

  return (
    <aside className="sidebar">
      <input
        type="text"
        placeholder="Filter"
        className="input-filter"
        value={filterTerm}
        onChange={event => filterList(event.target.value)}
      />
      <ul>{listItems}</ul>
      {/* <ul>{console.log("sidebar render")}</ul> */}
    </aside>
  );
  // } else {
  //   console.log("else");
  //   return <div>Loading...</div>;
  // }
};

// export default Sidebar;

export default GoogleApiWrapper({
  apiKey: G_KEY
})(Sidebar);
