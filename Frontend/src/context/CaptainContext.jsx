import { createContext, useState, useContext, useEffect } from "react";

const CaptainDataContext = createContext();
export { CaptainDataContext };

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
    localStorage.setItem("captain", JSON.stringify(captainData));
  };

  const value = {
    captain,
    setCaptain,
    updateCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
