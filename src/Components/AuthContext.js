// AuthContext.js

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("fio");
        if (storedUser && storedUser !== "undefined") {
            try {
                setAuth({
                    isAuthenticated: true,
                    user: JSON.parse(storedUser)
                });
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };