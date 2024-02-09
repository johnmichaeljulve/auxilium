import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from ".";
import {loader} from '../assets'

const DisplayProjects = ({ isLoading, projects, error }) => {
	const navigate = useNavigate();

	const handleNavigate = (project) => {
		navigate(`/project/${project._id}`, { state: project });
	};

	return (
		<div className="">
			<div className=" flex flex-wrap gap-[55px] mt-[20px] justify-center">
				{error ? <p>{error}</p> : isLoading && <img src={loader} alt="Loading" className="w-[100px] h-[100px] object-contain" />}
				

				{!isLoading && projects.length === 0 && (
					<p>There are no projects yet.</p>
				)}

				{!isLoading &&
					projects.length > 0 &&
					projects.map((project) => (
						<ProjectCard
							key={project._id}
							{...project}
							handleClick={() => handleNavigate(project)}
						/>
					))}
			</div>
		</div>
	);
};

export default DisplayProjects;
