import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, http } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import App from "@/app.tsx";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import "@/index.css";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
const reactApp = document.getElementById("root") as HTMLElement;
const projectId = import.meta.env.VITE_CONNECT_WALLET_PROJECT_ID;

const config = getDefaultConfig({
	appName: "Pinjoc",
	projectId: projectId,
	chains: [mainnet],
	transports: {
		[mainnet.id]: http(),
	},
});

ReactDOM.createRoot(reactApp).render(
	<React.StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<App />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>,
);
