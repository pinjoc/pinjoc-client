import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorrowAction } from "./borrow-action-section";

export function Action() {
	return (
		<div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-900">Borrow / Supply</h2>
			</div>
			<Tabs defaultValue="borrow" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="borrow">Borrow</TabsTrigger>
					<TabsTrigger value="supply">Supply</TabsTrigger>
				</TabsList>
				<TabsContent value="borrow">
					<div className="p-6 border border-gray-300 rounded-md">
						<BorrowAction />
					</div>
				</TabsContent>
				<TabsContent value="supply" />
			</Tabs>
		</div>
	);
}
