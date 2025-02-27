import { AvailableTokens } from "@/types";
import React, { useEffect } from "react";
import { useCLOBState } from "./clob-state";

interface StatItemProps {
	label: string;
	value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
	return (
		<div className="flex flex-col items-left">
			<span className="text-sm text-white">{label}</span>
			<strong className="text-xl font-semibold text-white">{value}</strong>
		</div>
	);
};

const Stats = (data: AvailableTokens) => {
	const { dispatch } = useCLOBState();
	useEffect(() => {
		dispatch({ type: "SET_DEBT_TOKEN", payload: data.DebtTokenSymbol });
		dispatch({
			type: "SET_COLLATERAL_TOKEN",
			payload: data.CollateralTokenSymbol,
		});
	}, [data]);
	return (
		<div className="w-full border-b bg-[#121323] border-gray-300">
			<div className="w-full  p-6 rounded-lg ml-8">
				{/* Token Information */}
				<div className="flex items-start gap-4">
					<h2 className="flex items-center text-lg font-semibold text-white">
						<img
							className="w-6 h-6 mr-2"
							src={data.CollateralTokenIcon}
							alt={data.CollateralTokenName}
						/>
						{data.CollateralTokenSymbol}
					</h2>
					<h2 className="flex items-center text-lg font-semibold text-white">
						<img
							className="w-6 h-6 mr-2"
							src={data.DebtTokenIcon}
							alt={data.DebtTokenName}
						/>
						{data.DebtTokenSymbol}
					</h2>
				</div>

				<br />

				{/* Stats Section */}
				<div className="flex space-x-12">
					<StatItem label="Lending Vault" value={String(data.LendingVault)} />
					<StatItem label="Borrow Vault" value={String(data.BorrowVault)} />
					<StatItem label="Maturity" value={data.MaturityRange} />
					<StatItem label="Rate" value={data.RateRange} />
				</div>
			</div>
		</div>
	);
};

export default Stats;
