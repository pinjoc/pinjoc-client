import React from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

interface CryptoIconProps {
	symbol: string;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol }) => {
	const icons: Record<string, JSX.Element> = {
		eth: <FaEthereum className="text-gray-900 text-2xl" />,
		btc: <FaBitcoin className="text-yellow-500 text-2xl" />,
		sol: <SiSolana className="text-purple-500 text-2xl" />,
	};

	return (
		<div className="flex items-center space-x-2">
			{icons[symbol.toLowerCase()] || <span className="text-red-500">?</span>}
			<span className="uppercase font-semibold text-gray-900">{symbol}</span>
		</div>
	);
};

interface CryptoPairProps {
	coin: string;
}

const CryptoPair: React.FC<CryptoPairProps> = ({ coin }) => {
	return (
		<div className="flex items-center space-x-2 text-2xl bg-white">
			<CryptoIcon symbol={coin} />
		</div>
	);
};

export default CryptoPair;
