import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

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

loader.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    breedSelect.classList.remove('hidden');
  })
  .catch(error => {
    console.error(error);
    breedSelect.classList.remove('hidden');
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  catInfoContainer.classList.add('hidden');
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      catInfoContainer.style.display = 'block';
    })
    .catch(error => {
      console.error(error);
      catInfoContainer.style.display = 'block';
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});