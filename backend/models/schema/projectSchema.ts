import { Types, Schema } from "mongoose";
import { ProjectType } from "../../types/projectTypes";

export interface IProjectSchema extends ProjectType {
	_id: Types.ObjectId;
}

const projectSchema = new Schema<IProjectSchema>(
	{
		title: {
			type: String,
			required: true,
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
		user_id: {
			type: String,
			required: true
		},
		raised: {
			type: Number,
		},
		contributor: [{
			type: String,
		}],
		team: [{
			type: String,
		}],
		contact: [{
			type: String,
		}],
		
	},
	{
		timestamps: true,
	}
);

export default projectSchema;
