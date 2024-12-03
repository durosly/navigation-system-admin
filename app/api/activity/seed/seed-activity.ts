import connectMongo from "@/lib/connectDB";
import LocationModel from "@/model/location";
import UserActivityModel from "@/model/user-activity";

// Function to generate a random date between two dates
const randomDate = (start: Date, end: Date) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Seed function
const seedUserActivities = async () => {
	try {
		await connectMongo();

		// Fetch all locations
		const locations = await LocationModel.find();

		if (!locations.length) {
			throw new Error("No locations found. Seed locations first.");
		}

		// Clear existing data to prevent duplicates
		await UserActivityModel.deleteMany({});

		const totalActivities = 40000;
		const activitiesPerLocation = Math.floor(totalActivities / locations.length);
		const extraActivities = totalActivities % locations.length;

		const lastMonth = new Date();
		lastMonth.setMonth(lastMonth.getMonth() - 1);

		const now = new Date();

		const activities: any[] = [];

		locations.forEach((location, index) => {
			const count = index < extraActivities ? activitiesPerLocation + 1 : activitiesPerLocation;

			for (let i = 0; i < count; i++) {
				activities.push({
					ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
					city: "Sample City",
					region: "Sample Region",
					country: "Sample Country",
					loc: `${location.value.lat},${location.value.lng}`,
					org: "Sample Organization",
					timezone: "Africa/Lagos",
					location: location._id,
					createdAt: randomDate(lastMonth, now),
					updatedAt: randomDate(lastMonth, now),
				});
			}
		});

		// Insert generated activities
		await UserActivityModel.insertMany(activities);

		console.log("User activities seeded successfully");
		return Response.json({ message: "User activities seeded successfully" });
	} catch (error) {
		console.error("Error seeding user activities:", error);
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		return Response.json({ message }, { status: 500 });
	}
};

export default seedUserActivities;
