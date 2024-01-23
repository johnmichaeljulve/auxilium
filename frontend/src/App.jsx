import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Discover, CreateProject, ProjectDetails, Profile, Home } from "./pages";
function App() {
	return (
		<>
			<div className="bg-[#2F3038] min-h-screen text-white">
				<Navbar />

				<Routes>
					<Route index element={<Home />}></Route>
					<Route path="/discover" element={<Discover />}></Route>
					<Route
						path="/create-project"
						element={<CreateProject />}
					></Route>
					<Route
						path="/project-details/:id"
						element={<ProjectDetails />}
					></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
