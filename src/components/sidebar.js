import React from "react";

const Sidebar = props => {
  const {
    deselectMarker,
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

  const listItems = placeList.map(place => {
    return (
      <li key={place.venue.id} name={place.name} className="place">
        {place.venue.name}
      </li>
    );
  });

  return (
    <aside className="sidebar">
      <input type="text" placeholder="Filter" className="input-filter" />
      <ul>{listItems}</ul>
    </aside>
  );
};

export default Sidebar;
