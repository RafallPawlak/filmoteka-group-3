export async function fetchApiById(idValue) {
  try {
    const API_KEY_V3 = 'bdba5342660bdd1dac5d09b885091a0c';
    const API_URL = 'https://api.themoviedb.org/3/';

    const params = new URLSearchParams({
      api_key: API_KEY_V3,
    });
    const response = await fetch(API_URL + 'movie/' + idValue + '?' + params);
    const films = await response.json();
    //console.log(films);
    return films;
  } catch (error) {
    console.log('fetchApiById: ', error);
  }
}
