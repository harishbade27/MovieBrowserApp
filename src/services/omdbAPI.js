const API_KEY = '4656e355';

export const searchMovies = async (query) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
  return await res.json();
};