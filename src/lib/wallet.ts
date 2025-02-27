import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rabbyWallet } from "@rainbow-me/rainbowkit/wallets";
import { type Chain } from "viem";
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

// const riseTestnet = {
//   id: 11155931, // Chain ID untuk Anvil / Hardhat
//   name: "Localhost",
//   network: "localhost",
//   nativeCurrency: {
//     name: "Ethereum",
//     symbol: "ETH",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: { http: ["http://127.0.0.1:8545"] },
//     public: { http: ["http://127.0.0.1:8545"] },
//   },
// };

export const riseTestnet = {
	id: 11155931,
	name: "Rise Sepolia",
	nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
	rpcUrls: {
		default: { http: ["https://testnet.riselabs.xyz"] },
	},
	blockExplorers: {
		default: {
			name: "blockscout",
			url: "https://testnet-explorer.riselabs.xyz",
		},
	},
} as const satisfies Chain;

export const config = createConfig({
	connectors,
	chains: [riseTestnet],
	transports: {
		[riseTestnet.id]: http(),
	},
});
