import React from "react";
import "../styles/css/sidebar.css";

const Sidebar = props => {
  const {
    filterList,
    filterTerm,
    markerList,
    onClickListItem,
    placeList
  } = props;

  // Render the list of places only if the markerList array has been populated.
  // The list is dependent upon the MapContainer component completing to store
  // the markers. Because of that, the first state of this component is rendered
  // with an empty "markerList" array, which makes it more difficult to marry
  // the list items with their respective markers.
  if (markerList.length > 0) {
    const listItems = placeList
      .filter(
        place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
      )
      .map(place => {
        return (
          <li
            className="place"
            key={place.id}
            onClick={onClickListItem.bind(this, place)}
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
  } else {
    console.log("else");
    return <div>Loading...</div>;
  }
};

export default Sidebar;
