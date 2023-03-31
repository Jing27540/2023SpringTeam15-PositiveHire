import { useState, createContext, useMemo, useContext } from "react";

/**
 * create auth to control the state of isAuthenticated.
 * @author Jing Huang
 */

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [role, setRole] = useState();

    // call this function when you want to authenticate the user
    const login = async (flag, u, r) => {
        setIsAuthenticated(flag);
        setUser(u);
        setRole(r);
    };

    // call this function to sign out logged in user
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
    };

    const value = useMemo(
        () => ({
            isAuthenticated,
            user,
            role,
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