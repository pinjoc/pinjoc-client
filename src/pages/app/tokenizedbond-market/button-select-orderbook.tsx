import React, { useState } from "react";

interface PoolControlsProps {
	onSelectionChange: (selection: string) => void;
}

const PoolControls: React.FC<PoolControlsProps> = ({ onSelectionChange }) => {
	const [selected, setSelected] = useState("all");

	const handleSelectionChange = (selection: string) => {
		setSelected(selection);
		onSelectionChange(selection);
	};

	return (
		<div className="flex items-center rounded-lg space-x-2">
			<button
				onClick={() => handleSelectionChange("all")}
				className={`relative text-sm border border-gray-500 font-medium rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "all"
						? "bg-[#22232E] text-white"
						: "text-gray-700 bg-[#22232E]/20 hover:bg-[#22232E]/50"
				}`}
				aria-pressed={selected === "all" ? "true" : "false"}
				aria-label="Toggle Borrow/Supply"
				title="Buy & Sell"
				type="button"
			>
				Buy & Sell
			</button>

			<button
				onClick={() => handleSelectionChange("borrow")}
				className={`text-sm border border-gray-500 font-medium rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "borrow"
						? "bg-[#22232E] text-white"
						: "text-gray-700 bg-[#22232E]/20 hover:bg-[#22232E]/50"
				}`}
				aria-pressed={selected === "borrow" ? "true" : "false"}
				aria-label="Select Buy option"
				title="Buy"
				type="button"
			>
				Buy
			</button>

			<button
				onClick={() => handleSelectionChange("supply")}
				className={`text-sm border border-gray-500 font-medium rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "supply"
						? "bg-[#22232E] text-white"
						: "text-gray-700 bg-[#22232E]/20 hover:bg-[#22232E]/50"
				}`}
				aria-pressed={selected === "supply" ? "true" : "false"}
				aria-label="Select sell option"
				title="Sell"
				type="button"
			>
				Sell
			</button>
		</div>
	);
};

export default PoolControls;
