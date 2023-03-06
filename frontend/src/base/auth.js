import { useState, createContext, useMemo, useContext } from "react";

/**
 * create auth to control the state of isAuthenticated.
 * @author Jing Huang
 */

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();

    // call this function when you want to authenticate the user
    const login = async (flag) => {
        setIsAuthenticated(flag);
    };

    // call this function to sign out logged in user
    const logout = () => {
        setIsAuthenticated(false);
    };

    const value = useMemo(
        () => ({
            isAuthenticated,
            login,
            logout
        }),
        [isAuthenticated]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};