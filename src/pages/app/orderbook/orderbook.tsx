import { cn } from "@/lib/utils";
import React from "react";

interface PoolProps {
	label: string;
	percentage: number;
}

const Pool: React.FC<{ pool: Array<PoolProps> }> = ({ pool }) => {
	const mylabel = "0xi8734hu3ifu4";
	const maxItems = 10;

	// Fill empty slots at the top with a white background
	const emptySlots = Array(Math.max(0, maxItems - pool.length)).fill(null);
	const filledPool = [...emptySlots, ...pool];

	return (
		<div className="w-full max-h-[400px] relative bg-white">
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Order Book</h2>
			<div className="flex flex-col border rounded-md overflow-hidden border-gray-300">
				{filledPool.map((item, index) => (
					<div key={index} className="flex items-center">
						<div
							className={cn(
								"flex-1 overflow-hidden relative h-12",
								item
									? mylabel === item.label
										? "bg-green-50"
										: "bg-gray-50"
									: "bg-white",
							)}
						>
							{item ? (
								<div
									className={cn(
										"h-full flex justify-between shadow-inner",
										mylabel === item.label ? "bg-green-200" : "bg-gray-200",
									)}
									style={{ width: `${item.percentage}%` }}
								>
									<span className="text-gray-900 text-sm font-medium absolute left-2 top-1/2 -translate-y-1/2">
										{mylabel === item.label
											? `${item.label} 👈 Your Position`
											: item.label}
									</span>
									<span className="text-sm font-medium absolute right-2 top-1/2 -translate-y-1/2">
										{item.percentage}%
									</span>
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
