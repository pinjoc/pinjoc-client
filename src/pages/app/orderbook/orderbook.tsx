import { cn } from "@/lib/utils";
import React from "react";
import { GroupPoolProps } from "./type";

const Pool: React.FC<GroupPoolProps> = ({ borrows, supplies }) => {
	const maxItems = 10;

	let borrowCount = borrows.length;
	let supplyCount = supplies.length;

	if (borrowCount + supplyCount > maxItems) {
		if (borrowCount > 5 && supplyCount > 5) {
			borrowCount = 5;
			supplyCount = 5;
		} else if (borrowCount > supplyCount) {
			borrowCount = maxItems - supplyCount;
		} else {
			supplyCount = maxItems - borrowCount;
		}
	}

	const adjustedBorrows = borrows.slice(0, borrowCount);
	const adjustedSupplies = supplies.slice(0, supplyCount);
	const filledPool = [...adjustedBorrows, ...adjustedSupplies];

	return (
		<div className="w-full max-h-[400px] relative bg-white">
			<h2 className="text-xl font-semibold text-center text-gray-900 mb-6">
				Order Book
			</h2>
			<div className="flex flex-col border overflow-hidden border-gray-300">
				<div
					className={cn(
						"h-full flex justify-between items-center p-3 shadow-inner text-gray-900",
					)}
				>
					<span className="text-sm font-medium">Price</span>
					<span className="text-sm font-medium">APY (%)</span>
					<span className="text-sm font-medium">Amount</span>
				</div>
				{filledPool.map((item, index) => (
					<div key={index} className="flex items-center">
						<div
							className={cn(
								"flex-1 overflow-hidden h-9",
								item ? "bg-gray-50" : "bg-white",
							)}
						>
							{item ? (
								<div
									className={cn(
										"h-full flex justify-between items-center p-3 shadow-inner text-gray-900",
										item.type === "supply"
											? "text-green-600 bg-green-50"
											: "text-red-600 bg-red-50",
									)}
								>
									<span className="text-sm font-medium">{item.price}</span>
									<span className="text-sm font-medium">{item.apy}%</span>
									<span className="text-sm font-medium">{item.amount}</span>
								</div>
							) : null}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Pool;
