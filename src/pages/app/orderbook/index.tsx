import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";

export default function OrderbookPage() {
	const progressData = [
		{ label: "0xi8734hu3ifu4", percentage: 32 },
		{ label: "0xsfg734ghreui", percentage: 100 },
		{ label: "0x83374hf38834", percentage: 100 },
		{ label: "0x3487h3ufh494", percentage: 100 },
	];
	return (
		<V2_AppLayout>
			<Stats />
			<div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				<div className="p-6 border-gray-300">
					<Pool pool={progressData} />
				</div>
				<div className="p-6 border-r border-gray-300">Column 2</div>
				<div className="p-6">Column 3</div>
			</div>
		</V2_AppLayout>
	);
}
