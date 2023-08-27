import axios from 'axios';
import { errorEl } from '..';

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGES_URL = 'https://api.thecatapi.com/v1/images/search';

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
    });
}

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({ breed_ids: breedId });

  return axios
    .get(IMAGES_URL, { params })
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
