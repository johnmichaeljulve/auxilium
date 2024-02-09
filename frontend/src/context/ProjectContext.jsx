import React, {createContext, useReducer } from "react";

export const ProjectsContext = createContext();

export const projectReducer = (state, action) => {
	switch (action.type) {
		case "SET_PROJECT":
			return {
				projects: action.payload,
			};
		case "CREATE_PROJECT":
			return {
				projects: [action.payload, ...state.projects],
			};
		default:
			return {
				state,
			};
	}
};

export const ProjectContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(projectReducer, {
		projects: [],
	});

	return (
		<ProjectsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ProjectsContext.Provider>
	);
};
