import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PoolProps } from "./type";
import PoolControls from "./button-select-orderbook";
import { useCLOBState } from "./clob-state";

const Pool = () => {
	const {
		state: { borrow, supply, settled, fixedRate },
		dispatch,
	} = useCLOBState();
	const [selectedOption, setSelectedOption] = useState<string>("all");
	const [filledPool, setFilledPool] = useState<Array<PoolProps>>([]);

	const handleSelectionChange = (selection: string) => {
		setSelectedOption(selection);
	};

	const maxItems = 10;

	useEffect(() => {
		setAll();
		dispatch({ type: "SET_BEST_RATE", payload: +settled });
	}, [borrow, supply, settled]);

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
		let borrowCount = borrow.length;

		if (borrowCount > maxItems) {
			// Here borrowRatio is always 1, so we can simply set borrowCount to maxItems.
			borrowCount = maxItems;
		}

		// Separate the items into removed and remaining ones for borrow
		const { removedborrowItems, remainingborrowItems } = borrow.reduce(
			(acc, item) => {
				if (item.apy === settled) {
					acc.removedborrowItems.push(item); // Collect removed borrow items
				} else {
					acc.remainingborrowItems.push(item); // Collect remaining borrow items
				}
				return acc;
			},
			{
				removedborrowItems: [] as PoolProps[],
				remainingborrowItems: [] as PoolProps[],
			},
		);

		const adjustedborrow = remainingborrowItems
			.slice(0, borrowCount)
			.sort((a, b) => b.apy - a.apy);

		// Combine and set the filled pool
		setFilledPool([
			...createEmptyItems(maxItems - (borrowCount + (settled ? 1 : 0))),
			...removedborrowItems,
			...adjustedborrow,
		]);
	};

	const setJustSupply = () => {
		let supplyCount = supply.length;

		if (supplyCount > maxItems) {
			// Here supplyRatio is always 1, so we can simply set supplyCount to maxItems.
			supplyCount = maxItems;
		}

		// Separate the items into removed and remaining ones for supply
		const { removedSupplyItems, remainingSupplyItems } = supply.reduce(
			(acc, item) => {
				if (item.apy === settled) {
					acc.removedSupplyItems.push(item); // Collect removed supply items
				} else {
					acc.remainingSupplyItems.push(item); // Collect remaining supply items
				}
				return acc;
			},
			{
				removedSupplyItems: [] as PoolProps[],
				remainingSupplyItems: [] as PoolProps[],
			},
		);

		const adjustedSupply = remainingSupplyItems
			.slice(0, supplyCount)
			.sort((a, b) => a.apy - b.apy);

		// Combine and set the filled pool
		setFilledPool([
			...createEmptyItems(maxItems - (supplyCount + (settled ? 1 : 0))),
			...adjustedSupply,
			...removedSupplyItems,
		]);
	};

	const setAll = () => {
		let borrowCount = borrow.length;
		let supplyCount = supply.length;

		if (borrowCount + supplyCount > maxItems) {
			const borrowRatio = borrowCount / (borrowCount + supplyCount);
			borrowCount = Math.round(maxItems * borrowRatio);
			supplyCount = maxItems - borrowCount;
		}

		// Separate the items into removed and remaining ones for borrow
		const { removedBorrowItems, remainingBorrowItems } = borrow.reduce(
			(acc, item) => {
				if (item.apy === settled) {
					acc.removedBorrowItems.push(item); // Collect removed borrow items
				} else {
					acc.remainingBorrowItems.push(item); // Collect remaining borrow items
				}
				return acc;
			},
			{
				removedBorrowItems: [] as PoolProps[],
				remainingBorrowItems: [] as PoolProps[],
			},
		);

		// Separate the items into removed and remaining ones for supply
		const { removedSupplyItems, remainingSupplyItems } = supply.reduce(
			(acc, item) => {
				if (item.apy === settled) {
					acc.removedSupplyItems.push(item); // Collect removed supply items
				} else {
					acc.remainingSupplyItems.push(item); // Collect remaining supply items
				}
				return acc;
			},
			{
				removedSupplyItems: [] as PoolProps[],
				remainingSupplyItems: [] as PoolProps[],
			},
		);

		// Adjusted borrow and supply lists after slicing and sorting
		const adjustedBorrow = remainingBorrowItems
			.slice(0, borrowCount)
			.sort((a, b) => b.apy - a.apy);

		const adjustedSupply = remainingSupplyItems
			.slice(0, supplyCount)
			.sort((a, b) => a.apy - b.apy);

		// Combine and set the filled pool
		setFilledPool([
			...createEmptyItems(
				maxItems - (borrowCount + supplyCount + (settled ? 1 : 0)),
			),
			...adjustedSupply,
			...removedSupplyItems,
			...removedBorrowItems,
			...adjustedBorrow,
		]);
	};

	return (
		<div className="w-full relative">
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-white">Order Book</h2>
				<br />
				<PoolControls onSelectionChange={handleSelectionChange} />
			</div>
			<div className="flex flex-col rounded-md overflow-hidden border bg-[#22232E] border-gray-700">
				<div className="w-full p-3 flex font-medium bg-[#22232E] text-white border-b border-gray-700">
					<span className="flex-1 text-left">APY (%)</span>
					<span className="flex-1 text-right">Amount</span>
				</div>
				{filledPool.map((item, index) => (
					<div
						key={index}
						className="flex items-center border-b h-10 border-gray-700 last:border-0"
					>
						<div
							className={cn(
								"flex-1 relative h-full flex items-center",
								item.apy !== settled
									? item.type === "LEND"
										? "text-green-300 text-sm"
										: "text-red-300 text-sm"
									: "text-white text-base font-semibold",
							)}
						>
							{item.type !== "empty" ? (
								<button
									type="button"
									disabled={item.apy === settled}
									className={cn(
										"w-full flex justify-between cursor-pointer disabled:cursor-not-allowed hover:bg-gray-600 p-2",
										fixedRate === item.apy
											? "font-bold bg-[#0f0f13]"
											: "font-medium bg-[#22232E]",
									)}
									onClick={() => {
										dispatch({
											type: "SET_CLOB_FIXED_RATE",
											payload: +item.apy,
										});
										dispatch({ type: "SET_FIXED_RATE", payload: +item.apy });
										dispatch({ type: "SET_MAX_AMOUNT", payload: +item.amount });
										dispatch({
											type: "SET_IS_MARKET",
											payload: false,
										});
									}}
								>
									<span className="flex-1 text-left">{item.apy}%</span>
									<span className="flex-1 text-right">
										{(item.amount / 1000).toLocaleString()} USDC
									</span>
								</button>
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
