import { useState } from "react";
import { client } from "../API";
import { useUserContext } from "./userUserContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const signup = async (name, email, password) => {
		setIsLoading(true);
		setError(null);

		await client
			.post("/user/signup", { name, email, password })
			.catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            });
			
		setIsLoading(false);
	};

	return { signup, isLoading, error };
};
