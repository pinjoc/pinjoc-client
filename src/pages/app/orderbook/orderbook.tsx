import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { GroupPoolProps, PoolProps } from "./type";
import PoolControls from "./button-select-orderbook";

const Pool: React.FC<GroupPoolProps> = ({ borrows, supplies, settled }) => {
	const [selectedOption, setSelectedOption] = useState<string>("all");
	const [filledPool, setFilledPool] = useState<Array<PoolProps>>([]);

	const handleSelectionChange = (selection: string) => {
		setSelectedOption(selection);
	};

	const maxItems = 10;

	useEffect(() => {
		setAll();
	}, []);

	useEffect(() => {
		switch (selectedOption) {
			case "all":
				setAll();
				break;
			case "borrow":
				setJustBorrow();
				break;
			case "supply":
				setJustSupply();
				break;
			default:
				break;
		}
	}, [selectedOption]);

	const createEmptyItems = (count: number) =>
		Array.from({ length: count }, () => ({
			type: "empty",
			price: 0,
			apy: 0,
			amount: 0,
		}));

	const setJustBorrow = () => {
		let borrowCount = borrows.length;

		if (borrowCount > maxItems) {
			// Here borrowRatio is always 1, so we can simply set borrowCount to maxItems.
			borrowCount = maxItems;
		}

		const adjustedBorrows = borrows.slice(0, borrowCount);

		setFilledPool([
			...createEmptyItems(maxItems - borrowCount),
			...adjustedBorrows,
			...(settled ? [settled] : []),
		]);
	};

	const setJustSupply = () => {
		let supplyCount = supplies.length;

		if (supplyCount > maxItems) {
			// Here supplyRatio is always 1, so we can simply set supplyCount to maxItems.
			supplyCount = maxItems;
		}

		const adjustedSupplies = supplies.slice(0, supplyCount);

		setFilledPool([
			...(settled ? [settled] : []),
			...adjustedSupplies,
			...createEmptyItems(maxItems - supplyCount),
		]);
	};

	const setAll = () => {
		let borrowCount = borrows.length;
		let supplyCount = supplies.length;

		if (borrowCount + supplyCount > maxItems) {
			const borrowRatio = borrowCount / (borrowCount + supplyCount);
			borrowCount = Math.round(maxItems * borrowRatio);
			supplyCount = maxItems - borrowCount;
		}

		const adjustedBorrows = borrows.slice(0, borrowCount);
		const adjustedSupplies = supplies.slice(0, supplyCount);

		setFilledPool([
			...createEmptyItems(
				maxItems - (borrowCount + supplyCount + (settled ? 1 : 0)),
			),
			...adjustedBorrows,
			...(settled ? [settled] : []),
			...adjustedSupplies,
		]);
	};

	return (
		<div className="w-full max-h-[400px] relative bg-white">
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-900">Order Book</h2>
				<br />
				<PoolControls onSelectionChange={handleSelectionChange} />
			</div>
			<div className="flex flex-col rounded-md overflow-hidden border border-gray-300">
				<div className="w-full p-3 flex font-medium bg-gray-200 border-b">
					<span className="flex-1 text-left">APY (%)</span>
					<span className="flex-1 text-right">Amount</span>
				</div>
				{filledPool.map((item, index) => (
					<div
						key={index}
						className="flex items-center h-10 border-b border-gray-200 last:border-0"
					>
						<div
							className={cn(
								"flex-1 relative h-full flex items-center px-4",
								item.type === "supply"
									? "text-green-700 text-sm"
									: item.type === "borrow"
										? "text-red-700 text-sm"
										: item.type === "settled"
											? "text-gray-900 text-lg bg-gray-300"
											: "bg-white",
							)}
						>
							{item.type !== "empty" ? (
								<div className="w-full flex justify-between font-medium">
									<span className="flex-1 text-left">{item.apy}%</span>
									<span className="flex-1 text-right">{item.amount}</span>
								</div>
							) : (
								<div className="w-full h-full" />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Pool;
