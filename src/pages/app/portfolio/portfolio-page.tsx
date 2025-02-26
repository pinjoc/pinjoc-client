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
			asset: "ETH",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			borrowed: "3.91k",
			liquidationRisk: "98",
			colleteral: "3.91k",
		},
		{
			id: 2,
			asset: "USDT",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			borrowed: "3.91k",
			liquidationRisk: "98",
			colleteral: "3.91k",
		},
	];
	const dataLend = [
		{
			id: 1,
			asset: "USDC",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			supplied: "3.91k",
			defaultRisk: "98",
			earned: "3.91k",
		},
		{
			id: 2,
			asset: "DAI",
			maturity: "3 Months - 10 Months",
			apy: 6.5,
			supplied: "3.91k",
			defaultRisk: "98",
			earned: "3.91k",
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
