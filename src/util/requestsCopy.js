// @Author:             Ryan Delk
// @Date:               2018-11-25 14:12:36
// @Last Modified by:   Ryan Delk
// @Last Modified time: 2018-11-25 14:12:36

import { FS_ID, FS_SECRET } from "./auth";
import axios from "axios";

const QUERY_TERM = "coffee";
const QUERY_LOCATION = "Oklahoma City";
const QUERY_VERSION = "20182507";
const ENDPOINT = "https://api.foursquare.com/v2/venues/search?";
const BASE_URL = "https://api.foursquare.com/v2/venues/";
const PARAM_FS_ID = `&client_id=${FS_ID}`;
const PARAM_FS_SECRET = `&client_secret=${FS_SECRET}`;
const URL_SEARCH = `${BASE_URL}search${PARAM_FS_ID}${PARAM_FS_SECRET}`;
let id = "";
const URL_DATA = `${BASE_URL}${id}v=${QUERY_VERSION}&`;
const CREDENTIALS = {
  client_id: FS_ID,
  client_secret: FS_SECRET
};
const QUERY = {
  query: QUERY_TERM,
  near: QUERY_LOCATION,
  v: QUERY_VERSION
};

class Helper {
  static async getResponse(param) {
    return await axios.get(this.getUrl(param)).then(response => {
      return response.data;
    });
  }

  static getUrl(param) {
    let query = new URLSearchParams(QUERY);
    let creds = new URLSearchParams(CREDENTIALS);

    // 4fc4db63e4b0d9d21ed8cae2

    // return `${BASE_URL}${param}${query}&${creds}`;
    return `${BASE_URL}${param}${query}&${creds}`;
  }

  // static async getResponseOld() {
  //   const PARAMS = {
  //     query: "coffee",
  //     near: "Oklahoma City",
  //     v: "20182507",
  //     client_id: "XATAV0HZ0MUVRNP2DMR4202KKJVBPO4PPHI21YNDSNKBSXUC",
  //     client_secret: "HTTEZQMQKMOGQXK1PWLOC3UTZI3HTWLULBMGZG5RY5T4UH1X"
  //   };
  //   return await axios
  //     .get(ENDPOINT + new URLSearchParams(PARAMS))
  //     .then(response => {
  //       console.log(response);
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(
  //         "Error fetching response from FOURSQUARE in getResponse() [requests.js]"
  //       );
  //       console.log(error);
  //       return error;
  //     });
  // }
}

export default class RequestCopy {
  static getPlaces() {
    return Helper.getResponse("search?");
  }

  static getPlacesData(id) {
    return Helper.getResponse(`${id}?`);
  }

  // static searchVenues(params) {
  //   return Helper.getResponseOld("/search", params);
  // }
}
