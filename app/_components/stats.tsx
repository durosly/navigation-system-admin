"use client";

import { handleError } from "@/lib/handleError";
import axios from "axios";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";

export type UserActivityResponse = {
	totalRequests: number;
	currentMonth: {
		requests: number;
		change: number;
		changePercent: string;
		direction: "positive" | "negative" | "neutral";
	};
	today: {
		requests: number;
		change: number;
		changePercent: string;
		direction: "positive" | "negative" | "neutral";
	};
};

function Stats() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<UserActivityResponse>({} as UserActivityResponse);
	const [errorMsg, setError] = useState("");

	useEffect(() => {
		async function getAnalytics() {
			setError("");
			try {
				const analytics = await axios<UserActivityResponse>("/api/location/analytics");
				setData(analytics.data);
			} catch (error) {
				const message = handleError(error);
				setError(message);
			} finally {
				setIsLoading(false);
			}
		}

		getAnalytics();
	}, []);

	if (errorMsg) {
		return (
			<div role="alert" className="alert alert-error">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>Error! {errorMsg}.</span>
			</div>
		);
	}

	return (
		<>
			<div className="stat place-items-center">
				<div className="stat-title">Total request</div>
				{isLoading ? <div className="stat-value skeleton w-20">&nbsp;</div> : <div className="stat-value">{abbreviateNumber(data.totalRequests)}</div>}

				<div className="stat-desc">Overall request</div>
			</div>

			<div className="stat place-items-center">
				<div className="stat-title">Current Month&apos;s requests</div>
				{isLoading ? (
					<div className="stat-value text-secondary skeleton w-20">&nbsp;</div>
				) : (
					<div className="stat-value text-secondary">{abbreviateNumber(data?.currentMonth.requests)}</div>
				)}
				{isLoading ? (
					<div className="stat-desc text-secondary skeleton w-10 mt-1">&nbsp;</div>
				) : (
					<div className="stat-desc text-secondary">
						{data.currentMonth.direction === "positive" ? "↗︎" : data.currentMonth.direction === "negative" ? "↘︎" : "|"}{" "}
						{abbreviateNumber(data.currentMonth.change, 2)} ({data.currentMonth.changePercent})
					</div>
				)}
			</div>

			<div className="stat place-items-center">
				<div className="stat-title">Today&apos;s requests</div>
				{isLoading ? (
					<div className="stat-value text-secondary skeleton w-20">&nbsp;</div>
				) : (
					<div className="stat-value">{abbreviateNumber(data?.today.requests, 2)}</div>
				)}
				{isLoading ? (
					<div className="stat-desc text-secondary skeleton w-10 mt-1">&nbsp;</div>
				) : (
					<div className="stat-desc">
						{data.today.direction === "positive" ? "↗︎" : data.today.direction === "negative" ? "↘︎" : "|"}{" "}
						{abbreviateNumber(data.today.change, 2)} ({data.today.changePercent})
					</div>
				)}
			</div>
		</>
	);
}

export default Stats;
