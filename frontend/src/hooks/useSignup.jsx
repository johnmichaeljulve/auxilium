import { useState } from "react";
import { isRouteErrorResponse } from "react-router-dom";
import { client } from "../API";
import { useUserContext } from "./userUserContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useUserContext();

	const signup = async (name, email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await client
			.post("/user/signup", { name, email, password })
			.catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            });
			
		setIsLoading(false);
	};

	return { signup, isLoading, error };
};
