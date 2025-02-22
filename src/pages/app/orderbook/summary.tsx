import CryptoPair from "@/components/ui/crypto-icon";
import React from "react";

interface StatItemProps {
	label: string;
	value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
	return (
		<div className="flex flex-col items-left">
			<span className="text-sm text-gray-500">{label}</span>
			<strong className="text-xl font-semibold text-gray-900">{value}</strong>
		</div>
	);
};

const Stats = () => {
	return (
		<div className="w-full border-b border-gray-300">
			<div className="flex justify-start space-x-12 p-6 bg-white w-full items-center">
				<CryptoPair coin="eth" />
				<StatItem label="Supplied" value="5.044M USDC" />
				<StatItem label="Borrowed" value="3.199M USDC" />
				<StatItem label="Utilization" value="63.43%" />
				<StatItem label="Volume (all time)" value="270.5M USDC" />
			</div>
		</div>
	);
};

export default Stats;
