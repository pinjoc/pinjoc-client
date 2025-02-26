import AppLayout from "@/components/layouts/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { columnLendOrder } from "./column-lend-order";
import { Collection, columnTransactions } from "./column-transaction";
import { columnBorrowOrder } from "./column-borrow-order";
import { columnBuyBond } from "./column-buy-bond";
import { columnSellBond } from "./column-sell-bond";
import { useAccount } from "wagmi";
import AddressEmpty from "@/components/ui/address-empty";

const HistoryPage = () => {
	const { address } = useAccount();
	const dataOrderBorrow = [
		{
			id: 1,
			asset: "ETH",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			borrowed: "3.91k",
			colleteral: "3.91k",
		},
		{
			id: 2,
			asset: "USDT",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			borrowed: "3.91k",
			colleteral: "3.91k",
		},
	];
	const dataOrderLend = [
		{
			id: 1,
			asset: "USDC",
			apy: 6.5,
			maturity: "3 Months - 10 Months",
			supplied: "3.91k",
			earned: "3.91k",
		},
		{
			id: 2,
			asset: "DAI",
			maturity: "3 Months - 10 Months",
			apy: 6.5,
			supplied: "3.91k",
			earned: "3.91k",
		},
	];

	const dataTransactions: Collection[] = [
		{
			id: 1,
			type: "Lend",
			asset: "USDC",
			amount: 30000,
			orderType: "Limit Order",
			status: "Pending",
			date: "2021-01-01",
		},
		{
			id: 2,
			type: "Borrow",
			asset: "USDC",
			amount: 30000,
			orderType: "Limit Order",
			status: "Pending",
			date: "2021-01-01",
		},
	];

	const dataBuyBond = [
		{
			id: 1,
			symbol: "GB2030",
			price: 30000,
			name: "GB2030",
		},
		{
			id: 2,
			symbol: "GB2030",
			price: 30000,
			name: "GB2030",
		},
	];
	const dataSellBond = [
		{
			id: 1,
			symbol: "GB2030",
			price: 30000,
			name: "GB2030",
		},
		{
			id: 2,
			symbol: "GB2030",
			price: 30000,
			name: "GB2030",
		},
	];
	return (
		<AppLayout>
			<div className="min-h-screen w-screen">
				{!address ? (
					<AddressEmpty />
				) : (
					<div className="max-w-5xl mx-auto">
						<Tabs defaultValue="lending-protocol">
							<TabsList className="bg-transparent">
								<TabsTrigger
									value="lending-protocol"
									className="rounded-full border-none text-white font-light"
								>
									Lending Protocol
								</TabsTrigger>
								<TabsTrigger
									value="tokenized-bond"
									className="rounded-full border-none text-white font-light"
								>
									Tokonized Bond
								</TabsTrigger>
								<TabsTrigger
									value="transactions"
									className="rounded-full border-none font-light text-white hover:bg-secondary-foreground"
								>
									Transactions
								</TabsTrigger>
							</TabsList>
							<TabsContent value="lending-protocol">
								<div>
									<h1 className="text-white text-xl font-semibold my-3 mb-5">
										Lending Order
									</h1>
									<DataTable columns={columnLendOrder} data={dataOrderLend} />
								</div>
								<div>
									<h1 className="text-white text-xl font-semibold my-3 mb-5">
										Borowed Order
									</h1>
									<DataTable
										columns={columnBorrowOrder}
										data={dataOrderBorrow}
									/>
								</div>
							</TabsContent>
							<TabsContent value="tokenized-bond">
								<div>
									<h1 className="text-white text-xl font-semibold my-3 mb-5">
										Buy Order
									</h1>
									<DataTable columns={columnBuyBond} data={dataBuyBond} />
								</div>
								<div>
									<h1 className="text-white text-xl font-semibold my-3 mb-5">
										Sell Order
									</h1>
									<DataTable columns={columnSellBond} data={dataSellBond} />
								</div>
							</TabsContent>
							<TabsContent value="transactions">
								<DataTable
									columns={columnTransactions}
									data={dataTransactions}
								/>
							</TabsContent>
						</Tabs>
					</div>
				)}
			</div>
		</AppLayout>
	);
};

export default HistoryPage;
