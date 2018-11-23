import React from "react";
import "../styles/css/sidebar.css";

const Sidebar = props => {
  const {
    filterList,
    filterTerm,
    placeList,
    selectListItem
    // placeSelected
  } = props;

  const listItems = placeList
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      return (
        <li
          className="place"
          key={place.id}
          // onClick={selectListItem.bind(this, place)}
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
    </aside>
  );
};

export default Sidebar;
