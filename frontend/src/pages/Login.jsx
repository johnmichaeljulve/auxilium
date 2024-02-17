import React, { useState } from "react";
import { box } from "../assets";
import { CustomButton, CustomInput } from "../components";
import { useUserContext } from "../hooks/userUserContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
	const { login, isLoading, error } = useLogin();
	const { dispatch } = useUserContext();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = await login(formData.email, formData.password);
		if(user) navigate("/discover");
	};

	return (
		<div className="flex flex-row justify-center items-center flex-1 bg-contain gap-80">
			<div className="w-[500px]">
				<img src={box} alt="box" />
			</div>
			<div className="bg-gradient-to-br from-cyan-500 to-orange-500 flex flex-col w-96 p-1.5 pt-10 rounded-lg">
				<form
					className="flex flex-col justify-center"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col">
						<CustomInput
							text="Email Address:"
							handleChange={handleChange}
							name="email"
							value={formData.email}
						/>
						<CustomInput
							text="Password:"
							handleChange={handleChange}
							type="password"
							name="password"
							value={formData.password}
						/>
					</div>
					<CustomButton
						text="Login"
						style="mt-10 mx-auto rounded-lg bg-black"
						type="submit"
						disabled={isLoading}
					/>
					<div className="h-10 flex items-center justify-center mb-32">
						{error && <p>{error}</p>}
					</div>
				</form>
				<div className="bg-gray-300 bg-opacity-25 flex justify-around items-center h-14 rounded-xl">
					<p className="text-lg">Not Registered Yet?</p>
					<CustomButton
						text="Signup"
						handleClick={() => navigate("/signup")}
						style="bg-[#669999]"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
