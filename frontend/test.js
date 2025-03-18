// const email = "abdulla23h@gmail.com";
// const password = "abdullah2234";

import { fetchBrands } from "./src/apis/api.js";
const response = await fetchBrands();

console.log(response.data);