import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SearchHistory = () => {
  const { searchHistory } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Search History</h2>

      {searchHistory.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {searchHistory.map((entry, index) => (
            <li key={index} className="text-gray-700">
              <span className="font-semibold">{entry.handle}</span> -{' '}
              <span className="text-gray-500">{entry.timestamp}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No search history available.</p>
      )}
    </div>
  );
};

export default SearchHistory;
