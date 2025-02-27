import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyAction } from "./supply-action-section";
import { BorrowAction } from "./borrow-action-section";

export function Action() {
	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-white">Borrow / Supply</h2>
			</div>
			<Tabs defaultValue="borrow" className="w-full">
				<TabsList className="grid w-full grid-cols-2 mb-3 bg-transparent">
					<TabsTrigger
						value="supply"
						className="data-[state=active]:bg-[#4A5565] bg-[#1f2233] hover:bg-gray-900 text-white border border-gray-800"
					>
						Supply
					</TabsTrigger>
					<TabsTrigger
						value="borrow"
						className="data-[state=active]:bg-[#4A5565] bg-[#1f2233] hover:bg-gray-900 text-white border border-gray-800"
					>
						Borrow
					</TabsTrigger>
				</TabsList>
				<TabsContent value="borrow">
					<div className="p-6 border bg-[#22232E] border-gray-500 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-white">Borrow</h3>
						</div>
						<BorrowAction />
					</div>
				</TabsContent>
				<TabsContent value="supply">
					<div className="p-6 border bg-[#22232E] border-gray-500 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-white">Supply</h3>
						</div>
						<SupplyAction />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
