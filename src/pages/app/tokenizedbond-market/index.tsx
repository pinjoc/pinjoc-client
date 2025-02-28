import Stats from "./summary";
import Pool from "./orderbook";
import OrderBookChart from "./chart-orderbook";
import { Action } from "./action-section";
import TokenizedBondMarketLayout from "@/components/layouts/tokenized-bond.layout";

export const maturityList = ["MAY2025", "AUG2025", "NOV2025", "FEB2026"];

export default function TokenizedBondMarketPage() {
	return (
		<TokenizedBondMarketLayout>
			<Stats />
			<div className="w-full grid grid-cols-4 overflow-x-hidden">
				<div className="col-span-2 p-6 border-r bg-[#121323] border-gray-300">
					<div>
						<OrderBookChart />
					</div>
					<div className="mt-4 text-white">Position</div>
				</div>
				<div className="col-span-1 p-6 border-r border-gray-300 bg-[#121422]">
					<Pool />
				</div>
				<div className="col-span-1 p-6 bg-[#121422]">
					<Action />
				</div>
			</div>
		</TokenizedBondMarketLayout>
	);
}
