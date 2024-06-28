import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  const [searchHistory, setSearchHistory] = useState(() => {
    // Load search history from localStorage if it exists
    const savedHistory = localStorage.getItem('searchHistory');

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    // Save search history to localStorage whenever it changes
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addSearchHistory = (handle) => {
    const timestamp = new Date().toLocaleString();

    setSearchHistory([...searchHistory, { handle, timestamp }]);
  };

  return (
    <AppContext.Provider
      value={{ videos, setVideos, searchHistory, addSearchHistory }}
    >
      {children}
    </AppContext.Provider>
  );
};
