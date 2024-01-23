import { Types, Schema } from "mongoose";
import { ProjectType } from "../../types/projectTypes";

export interface IProjectSchema extends ProjectType {
	_id: Types.ObjectId;
}

const projectSchema = new Schema<ProjectType>(
	{
		name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,	
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		target: {
			type: Number,
			required: true,
		},
		deadline: {
			type: Date,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default projectSchema;
