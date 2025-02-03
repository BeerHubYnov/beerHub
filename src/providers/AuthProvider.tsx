import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import AuthReducer, { AuthState, AuthAction, initState } from "../reducers/AuthReducer";

interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}

const defaultValueType: AuthContextType = {
    state: initState,
    dispatch: () => null,
};

export const AuthContext = createContext(defaultValueType);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initState);

    useEffect(() => {
        const user = localStorage.getItem('@user');
        if (user) {
            dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;