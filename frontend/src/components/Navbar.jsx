import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="flex justify-between bg-[#202027] text-white h-[50px] text-sm px-5 sticky top-0">
			<div className="my-auto">
				<Link to="/">Auxilium</Link>
			</div>

			<div className="flex gap-8 my-auto">
				<div className="flex gap-6">
					<Link to="/discover">Discover</Link>
					<Link to="/projects">Your Project</Link>
					<Link to="/create-project">Create</Link>
					<Link to="about-us">About Us</Link>
				</div>

				<Link to="login">Login</Link>
			</div>
		</div>
	);
};

export default Navbar;
