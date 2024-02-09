import { useState } from "react";
import { client } from "../API";
import { useUserContext } from "./userUserContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useUserContext();

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await client
			.post("/user/login", { email, password })
			.catch((err) => {
				setIsLoading(false);
				setError(err.response.data.message);
			});

		if (response) {
			localStorage.setItem("user", JSON.stringify(response.data));

			dispatch({ type: "LOGIN", payload: response.data });
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};
