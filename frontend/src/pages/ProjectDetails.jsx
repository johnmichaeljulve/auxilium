import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { client } from "../API";
import { CustomButton } from "../components";
import { useUserContext } from "../hooks/userUserContext";
import { ProjectDetailsModal } from "../modal";
import { calculateBarPercentage, daysLeft } from "../utils";

const ProjectDetails = () => {
	let { state } = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserContext();
	const [projectData, setProjectData] = useState(null);
	const dialogRef = useRef(null);

	const fetchProjects = async () => {
		try {
			setIsLoading(true);
			const response = await client.get(`/projects/${state._id}`);
			const json = await response.data;
			setProjectData(json);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			await client.delete(`/projects/${state._id}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			setIsLoading(false);
			navigate("/discover");
		} catch (err) {
			console.log(err);
		}
	};

	const fundProject = async () => {
		if (!user) {
			alert("Login first.");
			navigate("/login");
			return;
		}
		try {
			setIsLoading(true);
			const updatedState = await client.put(
				`/projects/${state._id}`,
				{
					...state,
					raised: projectData.raised + 1,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setProjectData(updatedState.data.updatedProject);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleDialog = () => {
		if (!dialogRef.current) return;

		dialogRef.current.hasAttribute("open")
			? dialogRef.current.close()
			: dialogRef.current.showModal();
	};

	return (
		<div className="mt-10">
			{isLoading ? (
				<p>Loading</p>
			) : (
				<div className="flex flex-row gap-40 px-10">
					<div className="flex flex-col text-black">
						<div className=" w-72 h-56 bg-white rounded-md flex flex-col items-center ">
							<h1 className="">Team</h1>
							{projectData?.team.map((name) => {
								return (
									<p className="py-3" key={name}>
										{name}
									</p>
								);
							})}
						</div>
						<div className="bg-white rounded-md mt-3 px-2">
							<p className="flex justify-end text-xs mt-2">
								Funded{" "}
								{calculateBarPercentage(
									projectData?.target,
									projectData?.raised
								)}
								%
							</p>
							<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div
									className="bg-[#669999] h-2.5 rounded-full"
									style={{
										width: `${
											calculateBarPercentage(
												projectData?.target,
												projectData?.raised
											) > 100
												? 100
												: calculateBarPercentage(
														projectData?.target,
														projectData?.raised
												  )
										}%`,
									}}
								></div>
							</div>
							<p>Raised: ₱ {projectData?.raised}</p>
							<p>Goal: ₱ {projectData?.target}</p>
							<p>
								Deadline: {daysLeft(projectData?.deadline)} Days
								Left
							</p>
							<div className="flex justify-end my-1">
								<CustomButton
									text="Fund"
									style="bg-[#669999] text-white"
									handleClick={toggleDialog}
								/>
								<dialog
									ref={dialogRef}
									onClick={(e) => {
										if (e.currentTarget === e.target)
											toggleDialog();
									}}
								>
									<ProjectDetailsModal />
									<CustomButton
										text="Donate"
										style="bg-[#669999] text-white"
										handleClick={fundProject}
									/>
									<CustomButton
										text="Close"
										style="bg-[#669999] text-white"
										handleClick={toggleDialog}
									/>
								</dialog>
							</div>
						</div>
						<div className="bg-white opacity-70">contact</div>
						<div className="bg-white opacity-70">Contributor</div>
					</div>
					<div className="flex flex-row w-[1000px]  justify-end">
						<div className="flex flex-col">
							<h1>Project name</h1>
							<h1>Description</h1>
							<img src={projectData?.image} alt="" />
						</div>
					</div>

					{/* {user?._id === projectData.user_id && (
						<CustomButton
							text="Delete"
							handleClick={handleClick}
							style="bg-black"
						/>
					)} */}
				</div>
			)}
		</div>
	);
};

export default ProjectDetails;
