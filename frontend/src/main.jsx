import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { ProjectContextProvider } from "./context/ProjectContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<UserContextProvider>
			<ProjectContextProvider>
				<App />
			</ProjectContextProvider>
		</UserContextProvider>
	</Router>
);
