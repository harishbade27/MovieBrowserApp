// pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbAPI';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoritesExist, setFavoritesExist] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMovieDetails(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesExist(favorites.length > 0);
  }, [id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some(fav => fav.imdbID === movie.imdbID);
    if (!exists) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFavoritesExist(true);
      setMessage('✅ Added to favorites!');
    } else {
      setMessage('ℹ️ Already in favorites.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div style={{
          border: '6px solid #f3f3f3',
          borderTop: '6px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!movie) return <p style={{ textAlign: 'center' }}>Movie not found</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={buttonStyle('#3498db')}>← Back</button>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', maxWidth: '300px', marginBottom: '1rem' }} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Ratings:</strong> {movie.Ratings?.map(r => `${r.Source}: ${r.Value}`).join(', ')}</p>
      
      <button onClick={handleAddToFavorites} style={{ ...buttonStyle('#e67e22'), marginRight: '0.5rem' }}>
        Add to Favorites
      </button>

      {favoritesExist && (
        <button onClick={() => navigate('/favorites')} style={buttonStyle('#2ecc71')}>
          Go to Favorites
        </button>
      )}

      {message && <p style={{ marginTop: '1rem', color: '#27ae60' }}>{message}</p>}
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer'
});

export default MovieDetails;
