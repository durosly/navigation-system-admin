import connectMongo from "@/lib/connectDB";
import LocationModel from "@/model/location";

// Seed function
const seedLocations = async () => {
	const data = [
		{ label: "SUG building", value: { lat: 5.571359327447203, lng: 5.843419568458262 } },
		{ label: "College of Technology", value: { lat: 5.572610390994874, lng: 5.843382265850617 } },
		{ label: "Petroleum Laboratory", value: { lat: 5.572761239934046, lng: 5.843013599771654 } },
		{ label: "Academic Library", value: { lat: 5.572940447213488, lng: 5.8423860888793655 } },
		{ label: "Electrical and Electronics Engineering Lab and Workshop, FUPRE", value: { lat: 5.572054730354094, lng: 5.843378032701324 } },
		{ label: "College of Science", value: { lat: 5.570012206069225, lng: 5.840741699412126 } },
		{ label: "Entrepreneurship Building", value: { lat: 5.569640730733174, lng: 5.840019154524333 } },
		{ label: "ICT Centre", value: { lat: 5.573459152399609, lng: 5.839623471516619 } },
		{ label: "Hostel A", value: { lat: 5.569138172290811, lng: 5.843320504127359 } },
		{ label: "Old Tetfund Building", value: { lat: 5.567828840773672, lng: 5.838878729626207 } },
		{ label: "New Tetfund Building", value: { lat: 5.568116624806624, lng: 5.8398220691743035 } },
		{ label: "Twin Building", value: { lat: 5.567351533281065, lng: 5.841196830759322 } },
		{ label: "FUPRE Football Field", value: { lat: 5.574579584565085, lng: 5.83573037102494 } },
		{ label: "FUPRE Girls Hostel Ugbomoro", value: { lat: 5.569290861275584, lng: 5.835426101272863 } },
	];

	try {
		await connectMongo();
		// Clear existing data to prevent duplicates
		await LocationModel.deleteMany({});

		// Insert new data
		await LocationModel.insertMany(data);
		console.log("Data seeded successfully");

		return Response.json({ message: "location seeded" });
	} catch (error: unknown) {
		console.error("Error seeding data:", error);
		let message = "something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		return Response.json({ message }, { status: 500 });
	}
};

export default seedLocations;
