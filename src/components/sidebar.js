import React from "react";
import "../styles/css/sidebar.css";

const Sidebar = props => {
  const {
    deselectMarker,
    filteredList,
    filterList,
    filterTerm,
    selectMarker,
    google,
    mapCenter,
    mapZoom,
    markerInfoWindowShowing,
    // markerList,
    // markerRef,
    markerSelected,
    placeList,
    selectListItem
    // placeSelected
  } = props;

  const listItems = placeList
    .filter(
      place =>
        place.venue.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <li
          key={place.venue.id}
          name={place.venue.name}
          className="place"
          onClick={selectListItem.bind(this, place)}
        >
          {place.venue.name}
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
    </aside>
  );
};

export default Sidebar;
