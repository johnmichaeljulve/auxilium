import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { client } from "../API";
import { CustomButton } from "../components";
import { useUserContext } from "../hooks/userUserContext";
import { calculateBarPercentage, daysLeft } from "../utils";

const ProjectDetails = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserContext();

	const handleClick = async () => {
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
	// {user?._id === state.user_id && <CustomButton text="Delete" handleClick={handleClick} style="bg-black"/>}
	return (
		<div className="mt-10">
			{isLoading ? (
				<p>Loading</p>
			) : (
				<div className="flex flex-row gap-40 px-10">
					<div className="flex flex-col text-black">
						<div className=" w-72 h-56 bg-white rounded-md flex flex-col items-center ">
							<h1 className="">Team</h1>
							<p className="py-3">John Michael julve</p>
							<p className="py-3">John Michael julve</p>
						</div>
						<div className="bg-white rounded-md mt-3 px-2">
							<p className="flex justify-end text-xs mt-2">
								Funded {calculateBarPercentage(state.target, 1)}
								%
							</p>
							<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div
									className="bg-[#669999] h-2.5 rounded-full"
									style={{ width: `40%` }}
								></div>
							</div>
							<p>Raised: ₱ 1</p>
							<p>Goal: ₱ {state.target}</p>
							<p>
								Deadline: {daysLeft(state.deadline)} Days Left
							</p>
							<div className="flex justify-end my-1">
								<CustomButton
									text="Fund"
									style="bg-[#669999] text-white"
								/>
							</div>
						</div>
						<div className="bg-white opacity-70">contact</div>
						<div className="bg-white opacity-70">Contributor</div>
					</div>
					<div className="flex flex-row w-[1000px]  justify-end">
						<div className="flex flex-col">
							<h1>Project name</h1>
							<h1>Description</h1>
              <img src={state.image} alt="" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectDetails;
