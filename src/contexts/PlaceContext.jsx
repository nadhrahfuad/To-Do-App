import { createContext } from "react";
import useLocalStorage from "use-local-storage";

export const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useLocalStorage("places", []);

  return (
    <PlaceContext.Provider value={{ places, setPlaces }}>
      {children}
    </PlaceContext.Provider>
  );
};
