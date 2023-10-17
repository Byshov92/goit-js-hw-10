import axios from 'axios';

export async function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] = 'live_Na8XqnKcUz6vWDbLIPzCN1V2ve4zTAWWdIX5M4Gdt7kkIpbrsNJ74wwcGTyWlNiY';

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}