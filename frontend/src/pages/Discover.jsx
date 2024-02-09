import React, { useEffect } from "react";
import { useState } from "react";
import { Banner, DisplayProjects } from "../components";
import { client } from "../API"
import { useProjectContext } from "../hooks/useProjectContext";

const Discover = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState();
	const {projects, dispatch} = useProjectContext()
	
	const fetchProjects = async () => {
		try{
			setIsLoading(true)
			const response = await client.get('/projects')
			const projectData = await response.data
			dispatch({type: 'SET_PROJECT', payload: projectData})
			setIsLoading(false)
		}catch(err){
			setError("Error - 503 Backend Fetch Failed")
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

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
