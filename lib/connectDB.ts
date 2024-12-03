import mongoose from "mongoose";

const connectMongo = async () => {
	try {
		if (mongoose.connection.readyState === 0) {
			mongoose.set("strictQuery", true);
			await mongoose.connect(process.env.MONGODB_URL);
			console.log("Successfully connected to MongoDB");
		}
		// else {
		// 	console.log("Already connected to MongoDB");
		// }
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export default connectMongo;
