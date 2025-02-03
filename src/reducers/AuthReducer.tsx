export interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    userInfos: any; 
}

export type AuthAction =
    | { type: "LOGIN"; payload: any } 
    | { type: "LOGOUT" }
    | { type: "SET_LOADING" }
    | { type: "UPDATE_USER_INFOS"; payload: any };

export const initState: AuthState = {
    isLogged: false,
    isLoading: false,
    userInfos: null,
};

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SET_LOADING = "SET_LOADING";
export const UPDATE_USER_INFOS = "UPDATE_USER_INFOS";

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                isLoading: false,
                userInfos: action.payload,
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "UPDATE_USER_INFOS":
            return {
                ...state,
                isLoading: false,
                userInfos: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                userInfos: initState.userInfos,
            };
        default:
            return initState;
    }
};

export default AuthReducer;