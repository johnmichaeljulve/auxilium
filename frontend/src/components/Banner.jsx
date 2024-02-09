import React from "react";
import { CustomButton } from "./index";

const Banner = ({ text, searchBar }) => {
	return (
		<div className="bg-gradient-to-r from-orange-500 to-cyan-500 flex h-[76px] px-5 mt-6">
			<div className="flex my-auto w-full justify-between">
				<h1 className="text-5xl pb-2">{text}</h1>
				{searchBar && (
					<div className="flex gap-4 items-center">
						<input
							type="text"
							className="h-10 w-96 border-white border-2 bg-transparent rounded-lg"
						/>
						<CustomButton text="Search" style="bg-black"/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Banner;
