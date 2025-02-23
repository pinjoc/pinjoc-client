import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";
import { ChartData, PoolProps } from "./type";
import OrderBookChart from "./chart-orderbook";

const mockBorrows: Array<PoolProps> = [
	{ type: "borrow", price: 100, apy: 5, amount: 10 },
	{ type: "borrow", price: 93, apy: 8, amount: 25 },
	{ type: "borrow", price: 90, apy: 9, amount: 30 },
];

const mockSupplies: Array<PoolProps> = [
	{ type: "supply", price: 110, apy: 3, amount: 22 },
	{ type: "supply", price: 112, apy: 2.8, amount: 28 },
	{ type: "supply", price: 115, apy: 2.5, amount: 35 },
];

const mockData: ChartData = {
	labels: ["Mar", "Jun", "Sep", "Dec"],
	datasets: [
		{
			label: "APY (%)",
			data: [2.1, 5.3, 5.7, 6.0],
			fill: true,
			backgroundColor: "rgba(75,192,192,0.2)",
			borderColor: "rgba(75,192,192,1)",
			tension: 0.4,
			pointRadius: 5,
			pointHoverRadius: 7,
		},
	],
};

export default function OrderbookPage() {
	return (
		<V2_AppLayout>
			<Stats />
			<div className="w-full h-full grid grid-cols-4">
				<div className="col-span-2 p-6 border-r border-gray-300">
					<div>
						<OrderBookChart data={mockData} />
					</div>
					<div className="mt-4">Position</div>
				</div>
				<div className="col-span-1 p-6 border-r border-gray-300">
					<Pool
						borrows={mockBorrows}
						supplies={mockSupplies}
						settled={{ type: "settled", price: 110, apy: 3, amount: 22 }}
					/>
				</div>
				<div className="col-span-1 p-6" />
			</div>
		</V2_AppLayout>
	);
}
