// TAPI-01
import axios from "axios";

export default function getLogRequest(baseURL, {server_id, search_query, qty, order, type}, cb) {
  let queryString = [];

  if (server_id) {queryString.push( `server_id=${server_id}` )}
  if (search_query) {queryString.push( `search_query=${search_query}` )}
  if (qty) {queryString.push( `quantity=${qty}` )}
  if (type && order) {queryString.push( `search_type=${type}-${order}` )}

   let URL = `${baseURL}?${queryString.join("&")}`;
   axios.get(URL)
   .then(data => {
    return cb(null, data);
   })
   .catch(error => {
    return cb(error, null);
   })
}