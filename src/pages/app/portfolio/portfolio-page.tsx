import AppLayout from "@/components/layouts/app-layout";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { DataTableBorrow } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columnBorrow } from "./column-borrow";
import { columnLend } from "./column-lend";

const PortfolioPage = () => {
	const { address } = useAccount();
	const dataBorrow = [
		{
			id: 1,
			asset: "ETH",
			apy: 6.5,
			borrowed: "3.91k",
			colleteral: "3.91k",
		},
		{
			id: 1,
			asset: "ETH",
			apy: 6.5,
			borrowed: "3.91k",
			colleteral: "3.91k",
		},
	];
	const dataLend = [
		{
			id: 1,
			asset: "ETH",
			apy: 6.5,
			supplied: "3.91k",
			earned: "3.91k",
		},
		{
			id: 1,
			asset: "ETH",
			apy: 6.5,
			supplied: "3.91k",
			earned: "3.91k",
		},
	];
	return (
		<AppLayout>
			<div className="min-h-screen w-screen">
				<div className="flex items-center justify-center">
					<Card className="bg-transparent">
						<CardContent className="flex flex-col items-center justify-center gap-5">
							<Avatar className="bg-red-300 flex items-center justify-center w-10 h-10">
								🍉
							</Avatar>
							<p className="text-white text-xs font-light">
								{address ? address.slice(0, 10) : "Connect Wallet"}
							</p>
							<div className="flex gap-2">
								<Button className="font-light bg-accent hover:bg-accent/90">
									Deposit
								</Button>
								<Button className="font-light bg-accent hover:bg-accent/90">
									Withdraw
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="max-w-5xl mx-auto">
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
							<DataTableBorrow columns={columnBorrow} data={dataBorrow} />
						</TabsContent>
						<TabsContent value="lend">
							<DataTableBorrow columns={columnLend} data={dataLend} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</AppLayout>
	);
};

export default PortfolioPage;
