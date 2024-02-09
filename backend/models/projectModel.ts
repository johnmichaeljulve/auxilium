import { model } from "mongoose";
import projectSchema, { IProjectSchema } from "./schema/projectSchema";

const ProjectModel = model<IProjectSchema>("Project", projectSchema); //IProjectchema supposed to be

export default ProjectModel;
