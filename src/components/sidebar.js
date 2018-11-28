import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { G_KEY } from "../util/auth.js";
import "../styles/css/sidebar.css";

export const Sidebar = props => {
  const { filterList, filterTerm, markers, onClickPlace, places } = props;

  // Render the list of places only if the markerList array has been populated.
  // The list is dependent upon the MapContainer component completing to store
  // the markers. Because of that, the first state of this component is rendered
  // with an empty "markerList" array, which makes it more difficult to marry
  // the list items with their respective markers.
  const listItems = places
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      let thisMarker = markers.find(marker => place.id === marker.props.id);
      return (
        <li
          className="place"
          key={place.id}
          onClick={onClickPlace.bind(this, thisMarker.props, thisMarker.marker)}
        >
          {place.name}
        </li>
      );
    });

  return (
    <aside>
      <input
        className="input-filter"
        onChange={event => filterList(event.target.value)}
        placeholder="Filter"
        tabIndex={0}
        type="text"
        value={filterTerm}
      />
      <ul tabIndex={0}>{listItems}</ul>
    </aside>
  );
};

export default GoogleApiWrapper({
  apiKey: G_KEY
})(Sidebar);
