import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rabbyWallet } from "@rainbow-me/rainbowkit/wallets";
import { mainnet } from "viem/chains";
import { createConfig, http } from "wagmi";

const projectId = import.meta.env.VITE_CONNECT_WALLET_PROJECT_ID;

const connectors = connectorsForWallets(
	[
		{
			groupName: "Recommended",
			wallets: [metaMaskWallet, rabbyWallet],
		},
	],
	{
		appName: "Pinjoc",
		projectId: projectId,
	},
);

const localhost = {
	id: 31337, // Chain ID untuk Anvil / Hardhat
	name: "Localhost",
	network: "localhost",
	nativeCurrency: {
		name: "Ethereum",
		symbol: "ETH",
		decimals: 18,
	},
	rpcUrls: {
		default: { http: ["http://127.0.0.1:8545"] },
		public: { http: ["http://127.0.0.1:8545"] },
	},
};

export const config = createConfig({
	connectors,
	chains: [mainnet, localhost],
	transports: {
		[mainnet.id]: http(),
	},
});
