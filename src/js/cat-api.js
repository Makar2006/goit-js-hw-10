import axios from 'axios';
const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.baseURL = BREEDS_URL;
axios.defaults.headers.common['x-api-key'] =
  'live_mn5incUMsdXsjLLV0E0kRLtdP2VXOmDCtATFq2ZWfxYeXSD1jEjGfAeswvWB6OYa';

function fetchBreeds() {
  return axios
    .get(BREEDS_URL)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export { fetchBreeds };
