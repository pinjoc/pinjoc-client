import AppLayout from "@/components/layouts/app-layout";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columnBorrow } from "./column-borrow";
import { columnLend } from "./column-lend";
import { DataTable } from "./data-table";
import { Banknote, HandCoins, Wallet } from "lucide-react";
import AddressEmpty from "@/components/ui/address-empty";

const PortfolioPage = () => {
	const { address } = useAccount();
	const dataBorrow = [
		{
			id: 1,
			asset: "WBTC/USDC",
			apy: "3.5%",
			maturity: "May 2025",
			borrowed: "20k",
			liquidationRisk: "5.00",
			colleteral: "1 WBTC",
		},
		{
			id: 2,
			asset: "WETH/USDC",
			apy: "5%",
			maturity: "May 2025",
			borrowed: "5%",
			liquidationRisk: "10.00",
			colleteral: "10 WETH",
		},
	];
	const dataLend = [
		{
			id: 1,
			asset: "WAAVE/USDC",
			apy: "8%",
			maturity: "May 2025",
			supplied: "18K USDC",
			defaultRisk: "0.50%",
			earned: "180 USDC",
		},
		{
			id: 2,
			asset: "WETH/USDC",
			maturity: "May 2025",
			apy: "7%",
			supplied: "33K USDC",
			defaultRisk: "0.33%",
			earned: "154 USDC",
		},
	];
	return (
		<AppLayout>
			<div className="min-h-screen w-screen">
				{!address ? (
					<AddressEmpty />
				) : (
					<div className="max-w-5xl mx-auto">
						<div className="grid grid-cols-3 gap-2 my-4">
							<Card className="bg-[#22232E] border-none w-full p-0 py-4 px-3">
								<div className="flex justify-between items-center">
									<span className="text-white font-light ">Total Lend</span>
									<HandCoins color="#fff" strokeWidth={1.5} />
								</div>
								<CardContent>
									<h1 className="font-semibold text-center text-white text-6xl">
										51K
									</h1>
								</CardContent>
							</Card>
							<Card className="bg-[#22232E] border-none w-full p-0 py-4 px-3">
								<div className="flex justify-between items-center">
									<span className="text-white font-light">Total Borrow</span>
									<Wallet color="#fff" strokeWidth={1.5} />
								</div>
								<CardContent>
									<h1 className="font-semibold text-center text-white text-6xl">
										31K
									</h1>
								</CardContent>
							</Card>
							<Card className="bg-[#22232E] border-none w-full p-0 py-4 px-3">
								<div className="flex justify-between items-center">
									<span className="text-white font-light ">Total Repay</span>
									<Banknote color="#fff" strokeWidth={1.5} />
								</div>
								<CardContent>
									<h1 className="font-semibold text-center text-white text-6xl">
										25K
									</h1>
								</CardContent>
							</Card>
						</div>
						<Tabs defaultValue="borrow">
							<TabsList className="bg-transparent">
								<TabsTrigger
									value="borrow"
									className="w-20 rounded-full border-none text-white font-light"
								>
									Borrow
								</TabsTrigger>
								<TabsTrigger
									value="lend"
									className="w-20 rounded-full border-none font-light text-white hover:bg-secondary-foreground"
								>
									Lend
								</TabsTrigger>
							</TabsList>
							<TabsContent value="borrow">
								<DataTable columns={columnBorrow} data={dataBorrow} />
							</TabsContent>
							<TabsContent value="lend">
								<DataTable columns={columnLend} data={dataLend} />
							</TabsContent>
						</Tabs>
					</div>
				)}
			</div>
		</AppLayout>
	);
};

export default PortfolioPage;
