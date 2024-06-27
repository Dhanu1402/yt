// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import SearchHistory from './pages/SearchHistory';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div>
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 text-white">
              <li>
                <Link to="/">Dashboard</Link>
              </li>

              <li>
                <Link to="/search-history">Search History</Link>
              </li>

              <li>
                <Link to="/insights">Insights</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/insights" element={<Insights />} />

            <Route path="/search-history" element={<SearchHistory />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
