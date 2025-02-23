import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyAction } from "./supply-action-section";
import { BorrowAction } from "./borrow-action-section";

export function Action() {
	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-900">Borrow / Supply</h2>
			</div>
			<Tabs defaultValue="borrow" className="w-full">
				<TabsList className="grid w-full grid-cols-2 mb-3">
					<TabsTrigger value="supply">Supply</TabsTrigger>
					<TabsTrigger value="borrow">Borrow</TabsTrigger>
				</TabsList>
				<TabsContent value="borrow">
					<div className="p-6 border border-gray-300 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-gray-900">Borrow</h3>
						</div>
						<BorrowAction />
					</div>
				</TabsContent>
				<TabsContent value="supply">
					<div className="p-6 border border-gray-300 rounded-md">
						<div className="mb-6">
							<h3 className="text-xl font-semibold text-gray-900">Supply</h3>
						</div>
						<SupplyAction />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
