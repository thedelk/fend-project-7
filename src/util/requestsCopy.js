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

const QUERY_TEST = {
  test: "testValue",
  ryan: "delk"
};

const CREDENTIALS = {
  client_id: FS_ID,
  client_secret: FS_SECRET
};

const QUERY_PARAMS = {
  near: QUERY_LOCATION,
  query: QUERY_TERM,
  v: QUERY_VERSION
};

const queryParamsString = Object.keys(QUERY_PARAMS)
  .map(key => `${key}=${QUERY_PARAMS[key]}`)
  .join("&")
  .replace(" ", "_");

//
//
// Classes
class Helper {
  static async getResponse() {
    const args = [...arguments];
    return await axios.get(this.getUrl([args])).then(response => {
      return response.data;
    });
  }

  static getUrl() {
    console.log([...arguments][0][0]);
    let theseArgs = [...arguments][0][0];
    console.log(theseArgs);

    // let testing = theseArgs.map(arg => ({}))

    // console.log(theseArgs);
    // let prms = new URLSearchParams(theseArgs);
    // let prmsAll = prms.entries();
    // console.log(prmsAll);
    // console.log(...arguments);
    // let query = new URLSearchParams(QUERY_PARAMS);
    // let creds = new URLSearchParams(CREDENTIALS);
    // let args = [...arguments][0].map(() => return arg);
    // let allArgs = new URLSearchParams([...arguments]);
    // console.log(args);

    // console.log(args.toString());

    // 4fc4db63e4b0d9d21ed8cae2

    // return `${BASE_URL}${param}${query}&${creds}`;
    return `https://api.foursquare.com/v2/venues/search?query=coffee&near=Oklahoma+City&v=20182507&client_id=XATAV0HZ0MUVRNP2DMR4202KKJVBPO4PPHI21YNDSNKBSXUC&client_secret=HTTEZQMQKMOGQXK1PWLOC3UTZI3HTWLULBMGZG5RY5T4UH1X`;
  }
}

export default class RequestCopy {
  static getPlaces() {
    // return Helper.getResponse("search?");
    return Helper.getResponse(QUERY_PARAMS, CREDENTIALS);
  }

  static getPlacesData(id) {
    return Helper.getResponse(`${id}?`);
  }
}
