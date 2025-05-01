import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleRemove = (id) => {
        removeFavorite(id);
        setFavorites(getFavorites());
    };

    if (!favorites.length)
        return <p style={{ textAlign: 'center' }}>No favorite movies yet.</p>;

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                padding: '1rem',
            }}
        >
            {favorites.map((movie) => (
                <div
                    key={movie.imdbID}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                >
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                        <h3
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                margin: '0.5rem 0',
                            }}
                        >
                            {movie.Title}
                        </h3>
                        <p style={{ color: '#555', marginBottom: '0.5rem' }}>{movie.Year}</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Link to={`/movie/${movie.imdbID}`}>More Info</Link>
                            <button
                                onClick={() => handleRemove(movie.imdbID)}
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    padding: '0.25rem 0.75rem',
                                    cursor: 'pointer',
                                }}
                            >
                                🗑️ Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Favorites;
