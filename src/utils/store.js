import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem("auth-token") ? JSON.parse(localStorage.getItem("auth-token")) : "",
};

function reducer(state, action) {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userInfo: action.payload };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}