// contexts/GuestContext.js
import { createContext, useContext, useState } from "react";

// Create the context
const GuestContext = createContext();

// GuestProvider to wrap the app
export const GuestProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);

    return (
        <GuestContext.Provider value={{ isGuest, setIsGuest }}>
            {children}
        </GuestContext.Provider>
    );
};

// Hook to use the context
export const useGuest = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error("useGuest must be used within a GuestProvider");
    }
    return context; // Returns { isGuest, setIsGuest }
};
