import { FS_URL } from "../util/auth";
import axios from "axios";

const QUERY = "coffee";
const LOCATION = "Oklahoma City";
const VERSION = "20182507";
const ENDPOINT = "https://api.foursquare.com/v2/venues/search?";
// const PARAMS = {
//   query: "coffee",
//   near: "Oklahoma City",
//   v: "20182507"
// };

const FS_URL_FULL = FS_URL.concat(`${QUERY}&near=${LOCATION}&v=${VERSION}`);

// export const getPlaces = () => {
//   axios.get(FS_URL_FULL + new URLSearchParams(PARAMS))
//   .then(response => {return response.data})
//   .catch(error => {
//     console.log("Error is in fetching response from FOURSQUARE in getResponse() in FourSquare.js")
//     console.log(error)
//     return error;
//   });
// };

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
        return response.data;
      })
      .catch(error => {
        console.log(
          "Error is in fetching response from FOURSQUARE in getResponse() in FourSquare.js"
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

  // static async getResponse() {
  //   const PARAMS = {
  //     query: "coffee",
  //     near: "Oklahoma City",
  //     v: "20182507"
  //   };

  //   return await axios
  //     .get(FS_URL + new URLSearchParams(PARAMS))
  //     .then(response => {
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(
  //         "Error fetching response from FOURSQUARE in getResponse() in FourSquare.js"
  //       );
  //       console.log(error);
  //       return error;
  //     });
  // }
}

// export const getPlacesData = () =>
//   fetch(FS_URL_FULL)
//     .then(response =>
//       response.json().then(text => ({ json: text, meta: response.data }))
//     )
//     .then(({ json, meta }) => {
//       return json;
//     });
