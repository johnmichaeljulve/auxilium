import React from "react";
import { calculateBarPercentage, daysLeft } from "../utils";

const ProjectCard = ({
	title,
	description,
	image,
	target,
	deadline,
	handleClick,
}) => {
	return (
		<div
			onClick={handleClick}
			className="cursor-pointer w-[300px] h-[388px] bg-white rounded-md text-black"
		>
			<img
				src={image}
				alt="project"
				className="w-full h-[158px] object-cover mt-4"
			/>
			<div className="flex flex-col gap-24">
				<div>
					<h1 className="text-2xl font-semibold ml-2">{title}</h1>
					<p className="ml-4">{description}</p>
				</div>
				<div>
					<div className="flex justify-between px-5">
						<p>{calculateBarPercentage(target, 1)}%</p>
						<p>? Raised of {target}</p>
						<p>{daysLeft(deadline)} Days left</p>
					</div>
					<div className="flex justify-center">Creator: </div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
