import React from "react";
import { box } from "../assets";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/userUserContext";

const Home = () => {
	const navigate = useNavigate()
	const {user} = useUserContext()

	const handleClick = () => {	
		navigate('/signup')
	}

	return (
		<div className="bg-background flex flex-row justify-center items-center flex-1 bg-contain gap-80">
			<div className="w-[500px]">
				<img src={box} alt="box" />
			</div>

			<div className="w-[380px] flex flex-col gap-20 ">
				<div className="text-6xl flex flex-col gap-8">
					<h1>CATALYST</h1>
					<h1>OF</h1>
					<h1>CHANGE</h1>
				</div>
				{!user && <CustomButton text="Sign up" style="bg-[#669999]" handleClick={handleClick}/>}
			</div>
		</div>
	);
};

export default Home;
