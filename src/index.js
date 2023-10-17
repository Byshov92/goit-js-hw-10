import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');
  breedSelect.style.width = '400px';
  

  breeds.forEach(breed => {
    const optionHTML = `<option value="${breed.id}">${breed.name}</option>`;
    breedSelect.insertAdjacentHTML('beforeend', optionHTML);
  });
  new SlimSelect({
    select: breedSelect,
  });
}

function displayCatInfo(cat) {
  const catInfoContainer = document.querySelector('.cat-info');
  catInfoContainer.innerHTML = '';

  const html = `
    <img src="${cat[0].url}" width="400">
    <p>Breed Name: ${cat[0].breeds[0].name}</p>
    <p>Description: ${cat[0].breeds[0].description}</p>
    <p>Temperament: ${cat[0].breeds[0].temperament}</p>
  `;

  catInfoContainer.insertAdjacentHTML('beforeend', html);
}

const breedSelect = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
catInfoContainer.style.width = '400px';
// breedSelect.classList.add('hidden');
// loader.style.display = 'none';

function catSelectorOptions() {
  loader.classList.remove('visually-hidden');
  breedSelect.classList.add('visually-hidden');
  // catInfoContainer.classList.add('visually-hidden');

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
      breedSelect.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    })
    .catch(error => {
      console.error(error);
      breedSelect.classList.remove('visually-hidden');
      catInfoContainer.classList.remove('visually-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

catSelectorOptions();

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  catInfoContainer.classList.add('visually-hidden');
  // loader.style.display = 'block';
  loader.classList.remove('visually-hidden');

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      // catInfoContainer.style.display = 'block';
      catInfoContainer.classList.remove('visually-hidden');
    })
    .catch(error => {
      console.error(error);
      // catInfoContainer.style.display = 'block';
      catInfoContainer.classList.add('visually-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      // loader.style.display = 'none';
      // catInfoContainer.classList.add('visually-hidden');
      loader.classList.add('visually-hidden');

    });
});