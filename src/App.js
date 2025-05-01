import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    transition: 'background 0.3s ease'
  };

  return (
    <Router>
      <nav style={{ backgroundColor: '#1f2937', color: 'white', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MovieBrowser</h1>
          <div style={{ marginTop: isMobile ? '1rem' : '0' }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                ...linkStyle,
                backgroundColor: isActive ? '#374151' : 'transparent'
              })}
              onMouseEnter={e => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={e => {
                if (!e.target.classList.contains('active')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/favorites"
              style={({ isActive }) => ({
                ...linkStyle,
                backgroundColor: isActive ? '#374151' : 'transparent'
              })}
              onMouseEnter={e => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={e => {
                if (!e.target.classList.contains('active')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Favorites
            </NavLink>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
