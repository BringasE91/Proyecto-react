export async function searchMovies(searchTerm) {
  const apiUrl = 'https://api.themoviedb.org/3';
  const apiKey = '762b2c1a2fde606a2ed507610bea1daa';
  const url = `${apiUrl}/search/movie?include_adult=false&language=es-ES&query=${searchTerm}&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}