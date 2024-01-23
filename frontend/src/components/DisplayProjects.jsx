import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from ".";

const DisplayProjects = ({ isLoading, projects, error }) => {
	const navigate = useNavigate();

	const handleNavigate = (project) => {
		navigate(`/project-details/${project._id}`, { state: project });
	};

	return (
		<div>
			<div className=" flex flex-wrap gap-[35px] mt-[10px] justify-center">
				{error ? <p>{error}</p> : isLoading && <p>Loading</p> }
				

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
