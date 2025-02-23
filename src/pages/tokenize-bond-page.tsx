import AppLayout from "@/components/layouts/app-layout";
import { ButtonWallet } from "@/components/ui/button-wallet";
import TerminalBoard from "@/shared/components/features/borrow-lend/terminal-board";
import { columns } from "@/shared/components/features/tokenizebond/column";
import { DataTable } from "@/shared/components/features/tokenizebond/data-table";
import { useAccount } from "wagmi";

const TokenizebondPage = () => {
	const { isConnected } = useAccount();
	const data = [
		{
			id: 1,
			symbol: "GB2030",
			name: "Government Bond 2030",
			price: 122222,
		},
		{
			id: 2,
			symbol: "XYZBOND",
			name: "Corporate Bond XYZ",
			price: 122622,
		},
		{
			id: 3,
			symbol: "GEB25",
			name: "Green Energy Bond 2025",
			price: 12000,
		},
		{
			id: 4,
			symbol: "GEB25",
			name: "Government Bond 2030",
			price: 150000,
		},
	];
	//   const slugs = [
	//     "stellar",
	//     "bitcoinsv",
	//     "ethereum",
	//     "dogecoin",
	//     "solana",
	//     "coinmarketcap",
	//     "coinbase",
	//     "chainlink",
	//     "hedera",
	//     "foundryvirtualtabletop",
	//     "blockchaindotcom",
	//   ];
	return (
		<AppLayout>
			{!isConnected && (
				<div className="container mx-auto w-full">
					<div className="flex items-center justify-between">
						<div className="space-y-5">
							<h1 className="text-white text-5xl">
								Provide you a{" "}
								<span className="font-bold text-primary">THING!</span>
							</h1>
							<span className="block text-white font-extralight w-4/5">
								Enabling seamless, Transparent, and Decentralized debt trading.
							</span>
							<ButtonWallet className="rounded-full w-1/2 py-7 text-xl tracking-wide font-light" />
						</div>
						<TerminalBoard />
					</div>
				</div>
			)}
			<div className="max-w-6xl mx-auto mt-8">
				<DataTable columns={columns} data={data} />
			</div>
		</AppLayout>
	);
};

export default TokenizebondPage;
