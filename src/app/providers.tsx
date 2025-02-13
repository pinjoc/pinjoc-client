// Provider like query2-an put right here bbyy!

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wallet";

const queryClient = new QueryClient();
import "@rainbow-me/rainbowkit/styles.css";

export function Providers({ children }: PropsWithChildren) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider modalSize="compact" theme={darkTheme()} coolMode>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
