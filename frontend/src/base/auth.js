import { useState, createContext, useMemo, useContext } from "react";

/**
 * create auth to control the state of isAuthenticated.
 * @author Jing Huang
 */

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();

    // call this function when you want to authenticate the user
    const login = async (flag, u) => {
        setIsAuthenticated(flag);
        setUser(u);
    };

    // call this function to sign out logged in user
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = useMemo(
        () => ({
            isAuthenticated,
            user,
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