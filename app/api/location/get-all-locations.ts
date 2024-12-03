import connectMongo from "@/lib/connectDB";
import LocationModel from "@/model/location";

async function getLocations() {
	try {
		await connectMongo();
		const locations = await LocationModel.find({});
		return Response.json(locations);
	} catch (error: unknown) {
		console.error("Error seeding data:", error);
		let message = "something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		return Response.json({ message }, { status: 500 });
	}
}

export default getLocations;
