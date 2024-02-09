import React, { createContext, useEffect, useReducer } from "react";

export const UsersContext = createContext();

export const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				user: action.payload,
			};
		case "LOGOUT":
			return {
				user: null,
			};
		default:
			return state;
	}
};

export const UserContextProvider = ({ children }) => {
	const currentUser = JSON.parse(localStorage.getItem('user'))
	
	const [state, dispatch] = useReducer(userReducer, {
		user: currentUser ? currentUser : null
	});
	

	return (
		<UsersContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UsersContext.Provider>
	);
};	
