import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { box } from "../assets";
import { CustomInput } from "../components";
import { useSignup } from "../hooks/useSignUp";


const Signup = () => {
	const {signup, isLoading, error } = useSignup()
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		confirmEmail: "",
		password: "",
		confirmPassword: ""
	});
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(`${formData.firstName} ${formData.lastName}`, formData.email, formData.password)
		e.target.reset()
		navigate("/login")
	};

	return (
		<div className="bg-background flex flex-row justify-center items-center flex-1 bg-contain gap-80">
			<div className="w-[500px]">
				<img src={box} alt="box" />
			</div>
			<form
				className="bg-gradient-to-br from-cyan-500 to-orange-500 flex flex-col w-96 p-1.5 pt-4 rounded-lg"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col">
					<CustomInput text="First Name:" handleChange={handleChange} name="firstName"/>
					<CustomInput text="Last Name:" handleChange={handleChange} name="lastName"/>
					<CustomInput text="Email Address:" handleChange={handleChange} name="email"/>
					<CustomInput text="Confirm Email Address:" handleChange={handleChange} name="confirmEmail"/>
					<CustomInput text="Password:" type="password" handleChange={handleChange} name="password"/>
					<CustomInput text="Re-Enter Password" type="password" handleChange={handleChange} name="confirmPassword"/>
				</div>
				<input
					disabled={isLoading}
					type="submit"
					className="bg-[#202027] rounded-lg mt-5 mb-1 mr-1 w-28 text-center p-2 font-thin tracking-wider text-base cursor-pointer place-self-end"
					value="Sign up"
				/>
				{error && (<p>{error}</p>)}
			</form>
		</div>
	);
};

export default Signup;
