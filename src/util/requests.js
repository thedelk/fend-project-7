import { FS_URL } from "../util/auth";

const QUERY = "coffee";
const LOCATION = "Oklahoma City";
const VERSION = "20182507";

const FS_URL_FULL = FS_URL.concat(`${QUERY}&near=${LOCATION}&v=${VERSION}`);

export const getPlacesData = () =>
  fetch(FS_URL_FULL)
    .then(response =>
      response.json().then(text => ({ json: text, meta: response.data }))
    )
    .then(({ json, meta }) => {
      return json;
    });
