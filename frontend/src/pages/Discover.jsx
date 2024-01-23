import React, { useEffect } from "react";
import { useState } from "react";
import { Banner, DisplayProjects } from "../components";
import { client } from "../API"

const Discover = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState();
	const [projects, setProjects] = useState([])
	
	const fetchProjects = async () => {
		try{
			setIsLoading(true)
			const response = await client.get()
			const projectData = response.data
			setProjects(projectData)
			setIsLoading(current => !current)
		}catch(err){
			setError("Error - 503 Backend Fetch Failed")
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	console.log("component rendered", isLoading)

	return (
		<div className="">
			<Banner text="Discover Projects" searchBar/>
			
			<DisplayProjects 
				isLoading = {isLoading}
				projects = {projects}
				error = {error}
			/>
		</div>
	)
};

export default Discover;
