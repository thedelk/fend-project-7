import { FS_URL } from "../util/auth";
import axios from "axios";

const QUERY = "coffee";
const LOCATION = "Oklahoma City";
const VERSION = "20182507";
const ENDPOINT = "https://api.foursquare.com/v2/venues/search?";

const BASE_URL = "https://api.foursquare.com/v2";

class Helper {
  static getParams(params) {
    const credentials = {
      v: VERSION,
      client_id: "XATAV0HZ0MUVRNP2DMR4202KKJVBPO4PPHI21YNDSNKBSXUC",
      client_secret: "HTTEZQMQKMOGQXK1PWLOC3UTZI3HTWLULBMGZG5RY5T4UH1X"
    };
    if (!params) {
      return credentials;
    } else {
      return Object.assign(credentials, params);
    }
  }

  static async getResponse() {
    const PARAMS = {
      query: "coffee",
      near: "Oklahoma City",
      v: "20182507",
      client_id: "XATAV0HZ0MUVRNP2DMR4202KKJVBPO4PPHI21YNDSNKBSXUC",
      client_secret: "HTTEZQMQKMOGQXK1PWLOC3UTZI3HTWLULBMGZG5RY5T4UH1X"
    };
    return await axios
      .get(ENDPOINT + new URLSearchParams(PARAMS))
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(
          "Error fetching response from FOURSQUARE in getResponse() [requests.js]"
        );
        console.log(error);
        return error;
      });
  }
}

export default class Request {
  static searchVenues(params) {
    return Helper.getResponse(`/venues/search`, params);
  }
}
