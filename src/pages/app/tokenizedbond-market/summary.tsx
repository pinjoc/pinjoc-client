import { TokenizedBonds } from "@/types";
import React, { useEffect, useMemo } from "react";
import { useCLOBState } from "./clob-state";
import { useParams } from "react-router-dom";

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

const Stats = () => {
	const { address } = useParams<{ address?: string }>();
	const data = useMemo(
		() => JSON.parse(atob(address || "")) as TokenizedBonds,
		[address],
	);
	const { dispatch } = useCLOBState();
	useEffect(() => {
		dispatch({ type: "SET_DEBT_TOKEN", payload: data.QuoteTokenSymbol });
		dispatch({
			type: "SET_DEBT_TOKEN_ADDRESS",
			payload: data.QuoteTokenAddress,
		});
		dispatch({
			type: "SET_COLLATERAL_TOKEN_ADDRESS",
			payload: data.BaseTokenAddress,
		});
		dispatch({
			type: "SET_COLLATERAL_TOKEN",
			payload: data.BaseTokenSymbol,
		});
	}, [data]);
	return (
		<div className="w-full border-b bg-[#121323] border-gray-300">
			<div className="w-full  p-6 rounded-lg ml-8">
				{/* Token Information */}
				<div className="flex items-start gap-4">
					<h2 className="flex items-center text-lg font-semibold text-white">
						{data.BaseTokenName}
					</h2>
				</div>

				<br />

				{/* Stats Section */}
				<div className="flex space-x-12">
					<StatItem label="Base Token" value={data.BaseTokenSymbol} />
					<StatItem label="Quote Token" value={data.QuoteTokenSymbol} />
					<StatItem label="Volume" value={String(data.Volume24h)} />
					<StatItem label="Maturity Range" value={String(data.MaturityRange)} />
					<StatItem label="Price Range" value={String(data.PriceRange)} />
				</div>
			</div>
		</div>
	);
};

export default Stats;
