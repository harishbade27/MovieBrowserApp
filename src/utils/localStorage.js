const FAVORITES_KEY = 'favoriteMovies';

export const getFavorites = () =>
  JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

export const saveFavorite = (movie) => {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = getFavorites().filter(fav => fav.imdbID !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};