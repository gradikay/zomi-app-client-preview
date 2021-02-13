// React required
import { useContext, createContext } from "react";
// -------------- Application Begins Bellow ------------ //

// This context saves User Status (Logged In or Not Logged In)
export const AppContext = createContext(null);

export function useAppContext() {
    return useContext(AppContext);
}