import { createContext, useContext, useState } from "react";
import { GlobalCardStateProviderProps, RefetchCardState } from "./types/globalstatetypes";

const GlobalCardRefetchStateContext = createContext<RefetchCardState | undefined>(undefined);

export const useGlobalCardRefetchState = () => {
    const context = useContext(GlobalCardRefetchStateContext);
    if (!context) {
        throw new Error('useGlobalCardState must be used within a GlobalCardStateProvider');
      }
    return context;
}

export const GlobalCardRefetchStateProvider: React.FC<GlobalCardStateProviderProps> = ({ children }) => {
    const [cardRefetch, setCardRefetch ] = useState(false);

    return (
        <GlobalCardRefetchStateContext.Provider value={{ cardRefetch, setCardRefetch}}>
            {children}
        </GlobalCardRefetchStateContext.Provider>
    )
}