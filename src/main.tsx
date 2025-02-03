import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import "@/index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "@/lib/wallet";
import App from "@/app";

const queryClient = new QueryClient();
const reactApp = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(reactApp).render(
	<React.StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider modalSize="compact" theme={darkTheme()} coolMode>
					<App />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>,
);
