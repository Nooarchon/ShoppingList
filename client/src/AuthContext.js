// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Implement your login logic here (e.g., make a request to your backend)
    // Upon successful authentication, set the authenticated user
    const authenticatedUser = { username }; // Example: set the username as the authenticated user
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    // Implement your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
