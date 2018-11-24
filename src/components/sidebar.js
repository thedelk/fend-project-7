import React from "react";
import "../styles/css/sidebar.css";

// const Sidebar = props => {
export const Sidebar = props => {
  const {
    filterList,
    filterTerm,
    markerList,
    onClickListItem,
    placeList,
    selectListItem
    // placeSelected
  } = props;

  const listItems = placeList
    .filter(
      place => place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0
    )
    .map(place => {
      console.log(markerList);
      let thisMarker = markerList.find(marker => place.id === marker.props.id);
      console.log(thisMarker);
      console.log(place);

      return (
        <li
          className="place"
          key={place.id}
          // onClick={onClickListItem.bind(this, place)}
          onClick={onClickListItem.bind(thisMarker)}
          // onClick={onClickListItem.bind(() =>
          //   markerList.find(marker => place.id === marker.props.id)
          // )}
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
      {/* {console.log("sidebar render")} */}
      <ul>{listItems}</ul>
    </aside>
  );
};

export default Sidebar;
