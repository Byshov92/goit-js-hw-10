import axios from 'axios';

export function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] = 'live_Na8XqnKcUz6vWDbLIPzCN1V2ve4zTAWWdIX5M4Gdt7kkIpbrsNJ74wwcGTyWlNiY';

  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}


export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}