import { FS_ID, FS_SECRET } from "./auth";
import axios from "axios";

// Static variable assignments
const QUERY_TERM = "coffee";
const QUERY_LOCATION = "Oklahoma City";
const QUERY_VERSION = "20182507";
const BASE_URL = "https://api.foursquare.com/v2/venues/";

// Static objects for data fetch URL building
const CREDENTIALS = { client_id: FS_ID, client_secret: FS_SECRET };
const VERSION = { v: QUERY_VERSION };
const QUERY_PARAMS = { near: QUERY_LOCATION, query: QUERY_TERM };

// Class containing the request function and URL builder
class Helper {
  // Performs data fetch with given endpoint (either the default
  // search parameters, or a specific place by its ID)
  static async getResponse(endpoint) {
    return await axios.get(this.getUrl(endpoint)).then(response => {
      return response.data;
    });
  }

  // Builds the URL for the data fetch
  static getUrl(endpoint) {
    // Destructure static variables into URL parameters
    let query = new URLSearchParams(QUERY_PARAMS);
    let version = new URLSearchParams(VERSION);
    let creds = new URLSearchParams(CREDENTIALS);

    // Send this back to getResponse() as the URL
    return `${BASE_URL}${endpoint}${version}&${creds}${
      // If the endpoint passed to getResponse() was "search?",
      // then it came from getPlaces(). To do the default search,
      // include the query parameters ("near" and "query").
      // If the endpoint does not include "search?", then it came
      // from getPlacesData() with an ID. To get details for
      // a specific place, query parameters are not used.
      endpoint.includes("search") ? "&" + query : ""
    }`;
  }
}

// Class that will be called from a component
export default class Request {
  // Retrieve default list of places
  static getPlaces() {
    return Helper.getResponse("search?");
  }

  // Retrieve detailed information about a specific place
  static getPlacesData(id) {
    return Helper.getResponse(`${id}?`);
  }
}
