import React from "react";

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
    placeList
    // placeSelected
  } = props;

  const listItems = placeList
    .filter(
      place =>
        place.venue.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <li key={place.venue.id} name={place.name} className="place">
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
