import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  const [searchHistory, setSearchHistory] = useState([]);

  const addSearchHistory = (handle) => {
    setSearchHistory([...searchHistory, handle]);
  };

  return (
    <AppContext.Provider
      value={{ videos, setVideos, searchHistory, addSearchHistory }}
    >
      {children}
    </AppContext.Provider>
  );
};
