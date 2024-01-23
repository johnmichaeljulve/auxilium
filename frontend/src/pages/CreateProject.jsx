import React from "react";
import { useState } from "react";
import { FormField } from "../components";
import { client } from "../API";
import { useNavigate } from "react-router-dom";
import {checkIfImage} from '../utils'

const CreateProject = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false);
	
	const [form, setForm] = useState({
		name: "",
		title: "",
		description: "",
		target: "",
		deadline: "",
		image: "",
	});

	const handleFormChange = (name, e) => {
		setForm({
			...form,
			[name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		checkIfImage(form.image, async (exists) =>{
			if(exists){
				setIsLoading(true)
				createProject(form)
				setIsLoading(false)
				navigate('/discover')
			}else{
				alert('Provide valid image URL')
				setForm({...form, image: ''})
			}
		})
		
		
	};

	const createProject = async (data) => {
		try{
			const response = await client.post('', {...data})
			console.log(response.data)
			setForm({
				name: "",
				title: "",
				description: "",
				target: "",
				deadline: "",
				image: "",
			});
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<FormField
						labelName="Your Name *"
						placeHolder="John Michael"
						inputType="text"
						value={form.name}
						handleChange={(e) => {
							handleFormChange("name", e);
						}}
					/>
					<FormField
						labelName="Project Title *"
						placeHolder="Enter your title here."
						inputType="text"
						value={form.title}
						handleChange={(e) => {
							handleFormChange("title", e);
						}}
					/>
				</div>
				<FormField
					labelName="Description *"
					placeHolder="Describe your project."
					inputType="text"
					value={form.description}
					handleChange={(e) => {
						handleFormChange("description", e);
					}}
				/>
				<div>
					<FormField
						labelName="Goal *"
						placeHolder="1000"
						inputType="text"
						value={form.target}
						handleChange={(e) => {
							handleFormChange("target", e);
						}}
					/>
					<FormField
						labelName="End Date *"
						placeHolder="End Date."
						inputType="date"
						value={form.deadline}
						handleChange={(e) => {
							handleFormChange("deadline", e);
						}}
					/>
					<FormField
						labelName="Project Image *"
						placeHolder="Place image URL of you project."
						inputType="url"
						value={form.image}
						handleChange={(e) => {
							handleFormChange("image", e);
						}}
					/>
				</div>

				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default CreateProject;
