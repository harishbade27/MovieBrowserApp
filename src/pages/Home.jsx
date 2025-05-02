import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdbAPI';
import { saveFavorite } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const DEFAULT_QUERY = '2025';

const Home = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [messageMap, setMessageMap] = useState({});

    useEffect(() => {
        searchMovies(DEFAULT_QUERY).then((res) => {
            setResults(res);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            searchMovies(query).then((res) => {
                setResults(res);
                setLoading(false);
            });
        } else if (query.length === 0) {
            setLoading(true);
            searchMovies(DEFAULT_QUERY).then((res) => {
                setResults(res);
                setLoading(false);
            });
        }
    }, [query]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSaveFavorite = (movie) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const exists = favorites.some(fav => fav.imdbID === movie.imdbID);
        const newMessage = exists
            ? `ℹ️ "${movie.Title}" is already in favorites`
            : `✅ "${movie.Title}" added to favorites`;

        if (!exists) saveFavorite(movie);

        setMessageMap(prev => ({ ...prev, [movie.imdbID]: newMessage }));

        setTimeout(() => {
            setMessageMap(prev => {
                const updated = { ...prev };
                delete updated[movie.imdbID];
                return updated;
            });
        }, 3000);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    padding: isMobile ? '0' : '0 1rem',
                    marginBottom: '2rem'
                }}
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    style={{
                        width: isMobile ? '90%' : '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '0.5rem'
                    }}
                />
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                    <div style={{
                        border: '5px solid #f3f3f3',
                        borderTop: '5px solid #3498db',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {results.map((movie) => (
                        <div
                            key={movie.imdbID}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease-in-out'
                            }}
                        >
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
                                alt={movie.Title}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1rem', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{movie.Title}</h3>
                                <p style={{ color: '#555', marginBottom: '0.5rem' }}>{movie.Year}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <Link to={`/movie/${movie.imdbID}`}>More Info</Link>
                                        <button onClick={() => handleSaveFavorite(movie)} style={{ cursor: 'pointer' }}>❤️</button>
                                    </div>
                                    {messageMap[movie.imdbID] && (
                                        <p style={{ color: '#27ae60', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                            {messageMap[movie.imdbID]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
