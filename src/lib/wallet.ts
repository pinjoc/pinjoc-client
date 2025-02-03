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

export const config = createConfig({
	connectors,
	chains: [mainnet],
	transports: {
		[mainnet.id]: http(),
	},
});
