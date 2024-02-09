import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectContext";

export const useProjectContext = () => {
	const context = useContext(ProjectsContext);
    
    return context
};
