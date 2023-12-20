import { useState, useContext, createContext } from "react";

// Creating a context for search functionality
const SearchContext = createContext();

// Creating a search provider component
const SearchProvider = ({ children }) => {
  //  initializing it with keyword and results
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  // Providing search state and setter through context to child components
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access search contexts
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
