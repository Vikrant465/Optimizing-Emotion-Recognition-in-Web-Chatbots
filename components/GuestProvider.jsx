// contexts/GuestContext.js
import { createContext, useContext, useState } from "react";

// Create the context
const GuestContext = createContext();

// Provider to wrap the app and provide the state
export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

// Hook to access the context
export const useGuest = () => useContext(GuestContext);
