// src/pages/SearchHistory.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SearchHistory = () => {
  const { searchHistory } = useContext(AppContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>

      <ul className="list-disc pl-5">
        {searchHistory.map((handle, index) => (
          <li key={index}>{handle}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
