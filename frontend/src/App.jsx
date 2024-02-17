import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import { useUserContext } from "./hooks/userUserContext";
import {
	Discover,
	CreateProject,
	ProjectDetails,
	Profile,
	Home,
	AboutUs,
	Login,
	Signup,
} from "./pages";
import MyProjects from "./pages/MyProjects";
import { Toaster } from 'sonner'

function App() {
	const { user } = useUserContext();
	return (
		<>
			<Toaster richColors position="top-center" />
			<div className="bg-[#2F3038] flex flex-col min-h-screen text-white">
				<Navbar />
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path="/discover" element={<Discover />}></Route>
					<Route path="/my-projects" element={user ? <MyProjects /> : <Navigate to="/login"/>}></Route>
					<Route
						path="/create-project"
						element={user ? <CreateProject /> : <Navigate to="/login" />}
					></Route>
					<Route
						path="/project/:id"
						element={<ProjectDetails />}
					></Route>
					<Route path="/about-us" element={<AboutUs />}></Route>
					<Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />}></Route>
					<Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />}></Route>
					<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/profile" />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
