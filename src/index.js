import './css/styles.css';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelectEl = document.querySelector('.breed-select');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');

function slim() {
  new SlimSelect({
    select: breedSelectEl,
    settings: {
      showSearch: false,
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the good stuff!',
      searchHighlight: true,
    },
  });
}

errorEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');
breedSelectEl.classList.add('is-hidden');

function populateBreedsSelect() {
  fetchBreeds().then(breed => {
    const markup = breed
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    breedSelectEl.insertAdjacentHTML('afterbegin', markup);
  });
}

populateBreedsSelect();

fetchBreeds()
  .then(data => {
    slim();
    breedSelectEl.classList.remove('is-hidden');
    loaderEl.classList.replace('loader', 'is-hidden');
  })
  .catch(onFetchError);

breedSelectEl.addEventListener('change', onChange);

function onChange(e) {
  loaderEl.classList.replace('is-hidden', 'loader');
  breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.replace('loader', 'is-hidden');
      breedSelectEl.classList.remove('is-hidden');
      createMarkup(data);

      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function createMarkup(data) {
  const card = data
    .map(el => {
      return `<img class="img-cat" src="${el.url}" alt="${el.breeds[0].name}" width="400"/><h2>Name: ${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h2>Temperament:</h2><p>${el.breeds[0].temperament}</p>`;
    })
    .join('');
  catInfoEl.innerHTML = card;
}

function onFetchError(error) {
  breedSelectEl.classList.remove('is-hidden');
  loaderEl.classList.replace('loader', 'is-hidden');
  console.log(error);
  catInfoEl.innerHTML = '';

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
