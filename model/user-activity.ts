import mongoose from "mongoose";
import { z } from "zod";
import LocationModel from "./location";

// Define the Mongoose schema for UserActivity
const userActivitySchema = new mongoose.Schema(
	{
		ip: { type: String, required: true },
		city: { type: String },
		region: { type: String },
		country: { type: String },
		loc: { type: String },
		org: { type: String },
		timezone: { type: String },
		location: { type: mongoose.Schema.Types.ObjectId, ref: LocationModel }, // Reference to LocationModel
	},
	{ timestamps: true }
);

// Create the Mongoose model
const UserActivityModel = mongoose.models.UserActivity || mongoose.model("UserActivity", userActivitySchema);

// Define the Zod schema for validation
export const userActivityZodSchema = z.object({
	ip: z.string(),
	city: z.string(),
	region: z.string(),
	country: z.string(),
	loc: z.string(),
	org: z.string(),
	timezone: z.string(),
	location: z.string(), // Expect a string representing the ObjectId
});

export default UserActivityModel;
