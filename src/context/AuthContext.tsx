import React, { createContext, useContext, useState, useReducer, useEffect } from "react";

// Définir les types des informations utilisateur
interface UserInfos {
  username: string; 
  email: string;
  password: string;
}

// Définir les actions possibles
const UPDATE_USER_INFOS = "UPDATE_USER_INFOS";

// Définir l'état du contexte
interface AuthContextType {
  isConnected: boolean;
  userInfos: UserInfos | null;
  login: (token: string) => void;
  logout: () => void;
  updateUserInfos: (userInfos: UserInfos) => void;
}

// Le reducer pour gérer les actions
const authReducer = (state: AuthContextType, action: any): AuthContextType => {
  switch (action.type) {
    case UPDATE_USER_INFOS:
      return {
        ...state,
        userInfos: action.payload, // Mettre à jour les infos utilisateur
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(!!localStorage.getItem("token"));
  
  // Charger les infos utilisateur depuis localStorage au démarrage
  const savedUserInfos = localStorage.getItem("userInfos");
  const initialUserInfos = savedUserInfos ? JSON.parse(savedUserInfos) : null;
  
  const [state, dispatch] = useReducer(authReducer, {
    isConnected,
    userInfos: initialUserInfos,  // Initialiser avec les infos utilisateur sauvegardées
    login: () => {},
    logout: () => {},
    updateUserInfos: () => {},
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsConnected(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsConnected(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
    localStorage.removeItem("userInfos"); // Optionnellement, supprimer les infos utilisateur aussi
  };

  // Fonction pour mettre à jour les informations de l'utilisateur dans l'état global et localStorage
  const updateUserInfos = (userInfos: UserInfos) => {
    dispatch({
      type: UPDATE_USER_INFOS,
      payload: userInfos,
    });

    // Sauvegarder les nouvelles infos utilisateur dans localStorage
    localStorage.setItem("userInfos", JSON.stringify(userInfos));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUserInfos }}>
      {children}
    </AuthContext.Provider>
  );
};
