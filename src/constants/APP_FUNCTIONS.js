
export function getObjectByKeyFromArray(array, key, value) {
  let i = array.map((o) => (o[key])).indexOf(value);
  return array[i];
}

export function getAPIFromName(array, value) {
  let o = getObjectByKeyFromArray(array, "name", value);
  return o.url;
}