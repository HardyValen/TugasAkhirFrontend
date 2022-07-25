import APP_CONSTANTS from "./APP_CONSTANTS";

export function getObjectByKeyFromArray(array, key, value) {
  let i = array.map((o) => (o[key])).indexOf(value);
  return array[i];
}

export function getAPIFromName(value) {
  let o = getObjectByKeyFromArray(APP_CONSTANTS.backend, "name", value);
  return o.url;
}