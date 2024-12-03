import connectMongo from "@/lib/connectDB";
import UserActivityModel, { userActivityZodSchema } from "@/model/user-activity";

async function registerLocationSearch(request: Request) {
	try {
		await connectMongo();
		const data = await request.json();
		console.log(data);
		const valid = userActivityZodSchema.safeParse(data);
		if (!valid.success) {
			console.log(valid.error.errors[0]);
			return Response.json({ message: valid.error.errors[0] }, { status: 400 });
		}

		await UserActivityModel.create(valid.data);

		return Response.json({ message: "Registered" });
	} catch (error: unknown) {
		console.log("Error seeding data:", error);
		let message = "something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		return Response.json({ message }, { status: 500 });
	}
}

export default registerLocationSearch;
