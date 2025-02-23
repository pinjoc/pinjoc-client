import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";
import { PoolProps } from "./type";

const mockBorrows: Array<PoolProps> = [
	{ type: "borrow", price: 100, apy: 5, amount: 10 },
	{ type: "borrow", price: 98, apy: 6, amount: 20 },
	{ type: "borrow", price: 95, apy: 7, amount: 15 },
	{ type: "borrow", price: 93, apy: 8, amount: 25 },
	{ type: "borrow", price: 90, apy: 9, amount: 30 },
];

const mockSupplies: Array<PoolProps> = [
	{ type: "supply", price: 105, apy: 4, amount: 12 },
	{ type: "supply", price: 107, apy: 3.5, amount: 18 },
	{ type: "supply", price: 110, apy: 3, amount: 22 },
	{ type: "supply", price: 112, apy: 2.8, amount: 28 },
	{ type: "supply", price: 115, apy: 2.5, amount: 35 },
];

export default function OrderbookPage() {
	return (
		<V2_AppLayout>
			<Stats />
			<div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				<div className="p-6 border-gray-300">
					<Pool borrows={mockBorrows} supplies={mockSupplies} />
				</div>
				<div className="p-6 border-r border-gray-300">Column 2</div>
				<div className="p-6">Column 3</div>
			</div>
		</V2_AppLayout>
	);
}
