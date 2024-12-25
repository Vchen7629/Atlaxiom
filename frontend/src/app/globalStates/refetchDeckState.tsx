import { createContext, useContext, useState } from "react";
import { GlobalDeckStateProviderProps, RefetchDeckState } from "./types/globalstatetypes";

const GlobalDeckRefetchStateContext = createContext<RefetchDeckState | undefined>(undefined);

export const useGlobalDeckRefetchState = () => {
    const context = useContext(GlobalDeckRefetchStateContext);
    if (!context) {
        throw new Error('useGlobalDeckState must be used within a GlobalDeckStateProvider');
      }
    return context;
}

export const GlobalDeckRefetchStateProvider: React.FC<GlobalDeckStateProviderProps> = ({ children }) => {
    const [deckRefetch, setDeckRefetch ] = useState(false);

    return (
        <GlobalDeckRefetchStateContext.Provider value={{ deckRefetch, setDeckRefetch}}>
            {children}
        </GlobalDeckRefetchStateContext.Provider>
    )
}