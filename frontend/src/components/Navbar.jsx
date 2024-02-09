import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useUserContext } from "../hooks/userUserContext";

const Navbar = () => {
	const {user} = useUserContext()
	return (
		<div className="flex justify-between bg-[#202027] text-white h-[80px] text-xl px-5 sticky top-0">
			<div className="my-auto">
				<Link to="/">
					<div className="cursor-pointer w-[290px]">
						<img src={logo} alt="Auxilium" className="" />
					</div>
				</Link>
			</div>

			<div className="flex gap-8 items-center">
				<div className="flex gap-6">
					<Link to="/discover">Discover</Link>
					{user && (
						<div className="flex gap-6">
							<Link to="/my-projects">My Project</Link>
							<Link to="/create-project">Create</Link>
						</div>
					)}

					<Link to="about-us">About Us</Link>
				</div>

				{user ? <Link to="/profile">
					<div className="flex bg-[#669999] w-[190px] h-[50px] rounded-md items-center pb-1 justify-center">
						{user.name}
					</div>
				</Link> : <Link to="login">Login</Link>}
			</div>
		</div>
	);
};

export default Navbar;
