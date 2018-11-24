import React, { Component } from "react";
import "../styles/css/layout.css";
import MapContainer from "./map";
import Sidebar from "./sidebar";
// import Header from "./header";

export default class App extends Component {
  // TODO: Configure active marker animation
  // TODO: Store place details so marker infoWindows can access it to display
  // TODO: Make app accessible
  state = {
    filterTerm: "",
    filteredList: [],
    mapCenter: {
      lat: 35.465076,
      lng: -97.507373
    },
    mapZoom: 12,
    markerInfoWindowShowing: false,
    markerList: [],
    markerSelected: undefined,
    // placeDetails: {},
    placeSelected: undefined
  };

  handleMarkerAnimation = () => {
    // Logic to handle turning on/off marker animation upon selection
  };

  markerActivate = (props, marker) => {
    this.setState({
      markerInfoWindowShowing: true,
      markerSelected: marker,
      placeSelected: props
    });
  };

  markerDeactivate = () => {
    this.setState({
      markerInfoWindowShowing: false,
      markerSelected: undefined,
      placeSelected: undefined
    });
  };

  onClickMarker = (props, marker) => {
    console.log(this.state);
    console.log(marker);

    if (this.state.markerSelected === marker) {
      this.deselectMarker(marker);
    } else {
      this.markerActivate(props, marker);
    }
  };

  // onClickListItem = listItem => {
  onClickListItem = (props, listItem) => {
    // In the list of markers, find the one that has the same ID
    // as the place that was selected in the list
    // let thisMarker = this.state.markerList.find(
    //   marker => listItem.id === marker.props.id
    // );

    console.log(this.state);
    console.log(listItem);
    console.log(props);
    // console.log(thisMarker.marker);

    // if (this.state.markerSelected === thisMarker.marker) {
    //   this.deselectMarker(thisMarker.marker);
    // } else {
    //   this.markerActivate(thisMarker.props, thisMarker.marker);
    // }
    // Now that the appropriate marker has been identified,
    // handle the functions associated with selecting a marker
    // (e.g. showing its info window, making it bounce)
  };

  storeMarkers = marker => {
    // Add the markers to the state array only once, otherwise typing in the filter
    // and clearing it will add extra copies of the markers to the array
    if (this.state.markerList.length === 0) {
      this.setState(prevState => ({
        markerList: [...prevState.markerList, marker]
      }));
    }
  };

  // FIXME: If a marker is selected and its info window is showing,
  // filtering out the result from the list does not remove the
  // marker's associated info window
  filterList = filterTerm => {
    this.setState({
      filterTerm: filterTerm,
      filteredList: this.props.placeList.filter(place => {
        return place.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0;
      })
    });
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // Old
  // deselectMarker = marker => {
  //   //
  //   // Temporary
  //   // const animatingMarkers = this.state.markerList;
  //   // animatingMarkers.forEach(m => m.marker.setAnimation(null));

  //   this.setState({
  //     markerInfoWindowShowing: false,
  //     // markerList: animatingMarkers,
  //     markerSelected: undefined,
  //     // placeDetails: {},
  //     placeSelected: undefined
  //   });
  // };

  selectMarker = (props, marker) => {
    console.log(marker);
    //
    // Temporary
    // const bouncingMarkers = this.state.markerList;
    // bouncingMarkers.forEach(staticMarker => {
    //   if (staticMarker.marker.id === marker.id) {
    //     staticMarker.marker.setAnimation(1);
    //   } else {
    //     staticMarker.marker.setAnimation(null);
    //   }
    // });
    // this.setState({
    //   markerList: bouncingMarkers
    // });

    // If a marker is already selected, clicking it again will deselect it
    if (this.state.markerSelected === marker) {
      this.deselectMarker(marker);
    } else {
      // Clicking a marker will show its information window
      this.setState({
        markerInfoWindowShowing: true,
        markerSelected: marker,
        // placeDetails: {},
        placeSelected: props
      });
    }
  };

  // FIXME: Associated marker bounces only on the second click of its
  // list item (so, on "deselect")
  selectListItem = listItem => {
    // In the list of markers, find the one that has the same ID
    // as the place that was selected in the list
    let thisMarker = this.state.markerList.find(
      marker => listItem.id === marker.props.id
    );

    // Now that the appropriate marker has been identified,
    // handle the functions associated with selecting a marker
    // (e.g. showing its info window, making it bounce)
    this.selectMarker(thisMarker.props, thisMarker.marker);
  };

  render() {
    // console.log(this.state);
    // console.log(this.props);
    // console.log("render app");
    // console.log(this);

    const {
      filterTerm,
      // filteredList,
      markerInfoWindowShowing,
      markerList,
      markerSelected,
      //   placeDetails,
      placeSelected,
      mapCenter,
      mapZoom
    } = this.state;

    const { placeList } = this.props;

    if (!placeList) {
      return (
        <div>
          <h1>Loading</h1>
          <p>Fetching map data...</p>
        </div>
      );
    } else {
      return (
        <div role="application">
          {/* <Header /> */}
          <main className="container" role="application">
            <Sidebar
              // deselectMarker={this.deselectMarker}
              filterList={this.filterList.bind(this)}
              filterTerm={filterTerm}
              // filteredList={filteredList}
              // getMarkers={this.getMarkers}
              // mapCenter={mapCenter}
              // mapZoom={mapZoom}
              // markerInfoWindowShowing={markerInfoWindowShowing}
              markerList={markerList}
              // markerRef={this.getMarkerRef}
              // markerSelected={markerSelected}
              onClickListItem={this.onClickListItem}
              // placeDetails={placeDetails}
              placeList={placeList}
              // placeSelected={placeSelected}
              selectListItem={this.selectListItem}
              // selectMarker={this.selectMarker}
            />
            <div className="map">
              <MapContainer
                // deselectMarker={this.deselectMarker}
                // filterList={this.filterList.bind(this)}
                filterTerm={filterTerm}
                // filteredList={filteredList}
                storeMarkers={this.storeMarkers}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                markerActivate={this.markerActivate}
                markerDeactivate={this.markerDeactivate}
                markerInfoWindowShowing={markerInfoWindowShowing}
                // markerList={markerList}
                markerSelected={markerSelected}
                onClickMarker={this.onClickMarker}
                // placeDetails={placeDetails}
                placeList={placeList}
                placeSelected={placeSelected}
                // selectMarker={this.selectMarker}
              />
            </div>
          </main>
        </div>
      );
    }
  }
}
