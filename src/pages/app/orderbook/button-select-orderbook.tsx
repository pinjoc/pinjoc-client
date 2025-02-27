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
				className={`relative text-sm font-medium border border-gray-800 rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "all"
						? "bg-[#4A5565] text-white"
						: "text-white bg-[#1f2233] hover:bg-gray-900"
				}`}
				aria-pressed={selected === "all" ? "true" : "false"}
				aria-label="Toggle Borrow/Supply"
				title="Borrow & Supply"
				type="button"
			>
				Borrow & Supply
			</button>

			<button
				onClick={() => handleSelectionChange("borrow")}
				className={`text-sm  font-medium rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "borrow"
						? "bg-[#4A5565] text-white"
						: "text-white bg-[#1f2233] hover:bg-gray-900"
				}`}
				aria-pressed={selected === "borrow" ? "true" : "false"}
				aria-label="Select Borrow option"
				title="Borrow"
				type="button"
			>
				Borrow
			</button>

			<button
				onClick={() => handleSelectionChange("supply")}
				className={`text-sm border border-gray-800 font-medium rounded-md transition px-3 h-10 flex items-center justify-center ${
					selected === "supply"
						? "bg-[#4A5565] text-white"
						: "text-white bg-[#1f2233] hover:bg-gray-900"
				}`}
				aria-pressed={selected === "supply" ? "true" : "false"}
				aria-label="Select Supply option"
				title="Supply"
				type="button"
			>
				Supply
			</button>
		</div>
	);
};

export default PoolControls;
