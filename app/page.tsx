import Stats from "./_components/stats";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				<h1 className="text-4xl font-bold text-center mb-5">FUPRE Navigation System</h1>
				<div className="stats max-sm:stats-vertical shadow">
					<Stats />
				</div>
			</div>
		</main>
	);
}
