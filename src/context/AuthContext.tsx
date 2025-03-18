import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

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
  if (action.type === UPDATE_USER_INFOS) {
    return {
      ...state,
      userInfos: action.payload, // Mettre à jour les infos utilisateur
    };
  }
  return state;
};

// Création du contexte
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider pour gérer l'authentification
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate(); // ✅ Déplacement de useNavigate() dans le composant

  const [isConnected, setIsConnected] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  // Charger les infos utilisateur depuis localStorage au démarrage
  const savedUserInfos = localStorage.getItem("userInfos");
  const initialUserInfos = savedUserInfos ? JSON.parse(savedUserInfos) : null;

  const [state, dispatch] = useReducer(authReducer, {
    isConnected,
    userInfos: initialUserInfos, // Initialiser avec les infos utilisateur sauvegardées
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

  // Fonction pour gérer la connexion
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsConnected(true);
    navigate("/");
    window.location.reload();
  };

  // Fonction pour gérer la déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfos"); // ✅ Supprimer les infos utilisateur en local
    setIsConnected(false);
    navigate("/"); // ✅ Rediriger vers l'accueil après déconnexion
    window.location.reload(); // ✅ Forcer le refresh de la page
  };

  // Fonction pour mettre à jour les informations utilisateur
  const updateUserInfos = (userInfos: UserInfos) => {
    dispatch({
      type: UPDATE_USER_INFOS,
      payload: userInfos,
    });

    // Sauvegarder les nouvelles infos utilisateur dans localStorage
    localStorage.setItem("userInfos", JSON.stringify(userInfos));
  };

  // Utilisation de useMemo pour éviter que l'objet ne change à chaque rendu
  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUserInfos,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
