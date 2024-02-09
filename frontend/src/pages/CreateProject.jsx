import React from "react";
import { useState } from "react";
import { CustomButton, CustomInput, FormField } from "../components";
import { client } from "../API";
import { useNavigate } from "react-router-dom";
import { checkIfImage } from "../utils";
import { loader } from "../assets";
import { useUserContext } from "../hooks/userUserContext";

const CreateProject = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserContext();

	const [form, setForm] = useState({
		title: "",
		description: "",
		target: "",
		deadline: "",
		image: "",
	});

	const handleFormChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		checkIfImage(form.image, async (exists) => {
			if (exists) {
				console.log("1")
				try {
					setIsLoading(true);
					await createProject(form);
					setIsLoading(false);
					navigate("/my-projects");
				} catch (err) {
					console.log(err);
					setIsLoading(false);
				}
			} else {
				console.log("2")
				alert("Provide valid image URL");
				setForm({ ...form, image: "" });
			}
		});
	};

	const createProject = async (data) => {
		try {
			await client.post(
				"/projects",
				{ ...data },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setForm({
				title: "",
				description: "",
				target: "",
				deadline: "",
				image: "",
			});
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	return (
		<div className="flex justify-center my-auto">
			<div className="bg-gradient-to-br from-cyan-500 to-orange-500 flex flex-col w-96 p-1.5 rounded-lg">
				<h1 className="flex justify-center text-2xl">Project Info</h1>
				<form onSubmit={handleSubmit} className="">
					<div className="flex flex-col">
						<CustomInput
							text="Title:"
							placeHolder="Enter your title here."
							handleChange={handleFormChange}
							value={form.title}
							name="title"
						/>
						<div className="flex flex-row gap-2">
							<div className="flex flex-col flex-grow">
								<CustomInput
									text="Goal:"
									placeHolder="1000."
									handleChange={handleFormChange}
									value={form.target}
									name="target"
								/>
							</div>
							<div className="flex flex-col">
								<CustomInput
									text="Duedate:"
									handleChange={handleFormChange}
									value={form.deadline}
									name="deadline"
									type="date"
								/>
							</div>
						</div>
						<label>Description:</label>
						<textarea
							name="description"
							rows="9"
							className="rounded border-solid border-white border-2 bg-transparent indent-1 resize-none"
							onChange={handleFormChange}
							value={form.description}
						></textarea>
						<CustomInput
							text="Image Link:"
							handleChange={handleFormChange}
							value={form.image}
							name="image"
						/>
					</div>
					<div className="mt-5 flex justify-end">
						<CustomButton
							text={isLoading ? "Creating" : "Submit"}
							style="bg-black"
							type="submit"
							disabled={isLoading}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateProject;
