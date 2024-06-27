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
        <div className="flex flex-col min-h-screen">
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 text-white">
              <li>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/search-history" className="hover:underline">
                  Search History
                </Link>
              </li>
            </ul>
          </nav>
          <main className="flex-grow p-4 bg-gray-100">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/search-history" element={<SearchHistory />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 p-4 text-white text-center">
            &copy; {new Date().getFullYear()} Your App Name
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
