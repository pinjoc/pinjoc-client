import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";
import { ChartData, GroupPoolProps } from "./type";
import OrderBookChart from "./chart-orderbook";
import { Action } from "./action-section";
import { useUpdateMaturity } from "@/hooks/use-maturity";

const mockGroupPool: GroupPoolProps = {
	supplies: [
		{
			price: 100,
			apy: 5.2,
			amount: 1000,
			type: "supply",
			maturity: "2025-12-31",
		},
		{
			price: 105,
			apy: 4.8,
			amount: 1500,
			type: "supply",
			maturity: "2026-06-30",
		},
	],
	borrows: [
		{
			price: 98,
			apy: 6.5,
			amount: 2000,
			type: "borrow",
			maturity: "2025-12-31",
		},
		{
			price: 102,
			apy: 7.1,
			amount: 2500,
			type: "borrow",
			maturity: "2026-06-30",
		},
	],
	settled: {
		price: 101,
		apy: 5.9,
		amount: 500,
		type: "settled",
		maturity: "2025-06-30",
	},
};

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
					<Pool {...mockGroupPool} />
				</div>
				<div className="col-span-1 p-6">
					<Action />
				</div>
			</div>
		</V2_AppLayout>
	);
}
