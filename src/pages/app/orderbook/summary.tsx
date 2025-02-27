import { AvailableTokens } from "@/types";
import React from "react";

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
	return (
		<div className="w-full border-b border-gray-500">
			<div className="w-full bg-[#121421] p-6 rounded-lg ml-8">
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
