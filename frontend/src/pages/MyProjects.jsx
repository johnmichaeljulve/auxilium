import React, { useEffect } from "react";
import { useState } from "react";
import { Banner, DisplayProjects } from "../components";
import { client } from "../API"
import { useUserContext } from "../hooks/userUserContext";

const MyProjects = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState();
    const [projects, setProjects] = useState([]);
    const {user} = useUserContext()
	
	const fetchProjects = async () => {
		
		try{
			setIsLoading(true)
			const response = await client.get('/projects/my-projects/', {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			})
			const projectData = response.data
            setProjects(projectData)
			setIsLoading(false)
		}catch(err){
			setError("Error - 503 Backend Fetch Failed: " + err )
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	return (
		<div className="">
			<Banner text="My Projects" searchBar/>
			
			<DisplayProjects 
				isLoading = {isLoading}
				projects = {projects}
				error = {error}
			/>
		</div>
	)
};

export default MyProjects;
