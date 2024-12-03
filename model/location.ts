// const mongoose = require("mongoose");
import mongoose from "mongoose";

// Define the schema
const locationSchema = new mongoose.Schema({
	label: { type: String, required: true },
	value: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
});

// Create the model
const LocationModel = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default LocationModel;
