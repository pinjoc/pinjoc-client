import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";
import { ChartData } from "./type";
import OrderBookChart from "./chart-orderbook";
import { Action } from "./action-section";
import { useUpdateMaturity } from "@/hooks/use-maturity";

export default function OrderbookPage() {
	const { mutate: updateMaturity } = useUpdateMaturity();

	const chartData: ChartData = {
		labels: ["March2025", "June2025", "September2025", "December2025"],
		datasets: [
			{
				label: "APY",
				data: [5, 7, 6, 8],
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
				tension: 0.4,
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};
	const handlePointClick = (pointIndex: number) => {
		const maturity = chartData.labels[pointIndex];

		updateMaturity(maturity);
	};
	return (
		<V2_AppLayout>
			<Stats />
			<div className="w-full h-full grid grid-cols-4">
				<div className="col-span-2 p-6 border-r border-gray-300">
					<div>
						<OrderBookChart data={chartData} onPointClick={handlePointClick} />
					</div>
					<div className="mt-4">Position</div>
				</div>
				<div className="col-span-1 p-6 border-r border-gray-300">
					<Pool borrows={[]} supplies={[]} />
				</div>
				<div className="col-span-1 p-6">
					<Action />
				</div>
			</div>
		</V2_AppLayout>
	);
}
