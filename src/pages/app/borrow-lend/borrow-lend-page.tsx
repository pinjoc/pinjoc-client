import AppLayout from "@/components/layouts/app-layout";
import { ButtonWallet } from "@/components/ui/button-wallet";
import { useAvailableTokens } from "@/hooks/use-available-tokens";
import { columns } from "@/pages/app/borrow-lend/column";
import { DataTable } from "@/pages/app/borrow-lend/data-table";
import TerminalBoard from "@/pages/app/borrow-lend/terminal-board";
import { useAccount } from "wagmi";

const BorrowLendPage = () => {
	const { isConnected } = useAccount();
	// const data = [
	//   {
	//     id: 1,
	//     asset: "Etherium",
	//     maturity: "3 Months",
	//     apy: 12.8,
	//     lenderVault: "3.91k",
	//     borrowVault: "3.91k",
	//   },
	//   {
	//     id: 2,
	//     asset: "Bitcoin",
	//     maturity: "3 Months",
	//     apy: 85.2,
	//     lenderVault: "3.91k",
	//     borrowVault: "3.91k",
	//   },
	//   {
	//     id: 3,
	//     asset: "Solana",
	//     maturity: "3 Months",
	//     apy: 122,
	//     lenderVault: "3.91k",
	//     borrowVault: "3.91k",
	//   },
	//   {
	//     id: 4,
	//     asset: "Dogecoin",
	//     maturity: "3 Months",
	//     apy: 6.8,
	//     lenderVault: "3.91k",
	//     borrowVault: "3.91k",
	//   },
	// ];
	// //   const slugs = [
	// //     "stellar",
	// //     "bitcoinsv",
	// //     "ethereum",
	// //     "dogecoin",
	// //     "solana",
	// //     "coinmarketcap",
	// //     "coinbase",
	// //     "chainlink",
	// //     "hedera",
	// //     "foundryvirtualtabletop",
	// //     "blockchaindotcom",
	// //   ];

	const { availableTokens, isAvailableTokenLoading } = useAvailableTokens();

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
			<div className="max-w-7xl mx-auto mt-8">
				{isAvailableTokenLoading ? (
					<div className="space-y-3">
						<div className="bg-[#22232E] animate-pulse h-8 w-96" />
						<div className="bg-[#22232E] animate-pulse h-72" />
					</div>
				) : (
					<DataTable columns={columns} data={availableTokens!} />
				)}
			</div>
		</AppLayout>
	);
};

export default BorrowLendPage;
