import { model } from "mongoose";
import projectSchema from "./schema/projectSchema";
import { ProjectType } from "../types/projectTypes";

const ProjectModel = model<ProjectType>("Project", projectSchema); //IProjectchema supposed to be

export default ProjectModel;
