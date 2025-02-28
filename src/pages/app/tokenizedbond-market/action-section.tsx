import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyAction } from "./supply-action-section";
import { BorrowAction } from "./borrow-action-section";
import SelectMaturity from "./select-maturity";

export function Action() {
	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-white">Buy / Sell</h2>
			</div>
			<Tabs defaultValue="borrow" className="w-full">
				<TabsList className="grid w-full grid-cols-2 mb-3 bg-transparent">
					<TabsTrigger
						value="supply"
						className="data-[state=active]:bg-[#22232E] border-gray-500 data-[state=active]:text-white"
					>
						Sell
					</TabsTrigger>
					<TabsTrigger
						value="borrow"
						className="data-[state=active]:bg-[#22232E] border-gray-500 data-[state=active]:text-white"
					>
						Buy
					</TabsTrigger>
				</TabsList>
				<TabsContent value="borrow">
					<SelectMaturity />
					<br />
					<div className="p-6 border border-gray-300 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-white">Buy</h3>
						</div>
						<BorrowAction />
					</div>
				</TabsContent>
				<TabsContent value="supply">
					<SelectMaturity />
					<br />
					<div className="p-6 border border-gray-300 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-white">Sell</h3>
						</div>
						<SupplyAction />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
