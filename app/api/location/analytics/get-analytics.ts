import UserActivityModel from "@/model/user-activity";
import connectMongo from "@/lib/connectDB";

async function getAnalytics() {
	try {
		await connectMongo();
		// Total requests (overall)
		const totalRequests = await UserActivityModel.countDocuments();

		// Current month's requests
		const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
		const currentMonthRequests = await UserActivityModel.countDocuments({
			createdAt: { $gte: currentMonthStart },
		});

		// Calculate previous month's requests
		const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
		const currentMonthEnd = new Date(currentMonthStart);
		const previousMonthRequests = await UserActivityModel.countDocuments({
			createdAt: { $gte: previousMonthStart, $lt: currentMonthEnd },
		});

		// Today's requests
		const todayStart = new Date();
		todayStart.setHours(0, 0, 0, 0);
		const todayRequests = await UserActivityModel.countDocuments({
			createdAt: { $gte: todayStart },
		});

		// Calculate previous day's requests
		const yesterdayStart = new Date(todayStart);
		yesterdayStart.setDate(yesterdayStart.getDate() - 1);
		const previousDayRequests = await UserActivityModel.countDocuments({
			createdAt: { $gte: yesterdayStart, $lt: todayStart },
		});

		// Calculate percentages and directions
		const monthChange = currentMonthRequests - previousMonthRequests;
		const monthChangePercent = previousMonthRequests ? ((monthChange / previousMonthRequests) * 100).toFixed(1) : "0";
		const monthDirection = monthChange > 0 ? "positive" : monthChange < 0 ? "negative" : "neutral";

		const dayChange = todayRequests - previousDayRequests;
		const dayChangePercent = previousDayRequests ? ((dayChange / previousDayRequests) * 100).toFixed(1) : "0";
		const dayDirection = dayChange > 0 ? "positive" : dayChange < 0 ? "negative" : "neutral";

		return Response.json({
			totalRequests,
			currentMonth: {
				requests: currentMonthRequests,
				change: monthChange,
				changePercent: `${monthChange > 0 ? "+" : ""}${monthChangePercent}%`,
				direction: monthDirection,
			},
			today: {
				requests: todayRequests,
				change: dayChange,
				changePercent: `${dayChange > 0 ? "+" : ""}${dayChangePercent}%`,
				direction: dayDirection,
			},
		});
	} catch (error) {
		console.error("Error fetching user activity stats:", error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}

export default getAnalytics;
