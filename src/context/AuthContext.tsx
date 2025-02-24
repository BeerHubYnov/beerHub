import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isConnected: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider pour englober l'application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsConnected(!!localStorage.getItem("token"));
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsConnected(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <AuthContext.Provider value={{ isConnected, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
