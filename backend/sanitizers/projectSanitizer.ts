import { ProjectType } from "../types/projectTypes";
import HttpException from "../utils/httpException";

export function sanitizeProject(project: ProjectType): ProjectType {
	let sanitizedProject = <ProjectType>{};

	sanitizedProject.title = sanitizeTitle(project.title);
	return sanitizedProject;
}

function sanitizeTitle(title: string): string {
    // Types
    if (title === undefined){
        throw new HttpException('There is no title', 400)
    }
    if (typeof title !== 'string'){
        throw new HttpException('Title should be a type of string', 400)
    }

    //Attributes
    title = title.trim()
    if (title.length < 3){
        throw new HttpException('Title must be atleast 3 characters', 400)
    }
    if (title.length > 50){
        throw new HttpException('Title must be less than 50 characters', 400)
    }

    return title
}


