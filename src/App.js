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
          <nav className="bg-purple-200 p-4">
            <ul className="flex space-x-4">
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

          <main className="flex-grow p-4 bg-gray-200">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/insights" element={<Insights />} />

              <Route path="/search-history" element={<SearchHistory />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
