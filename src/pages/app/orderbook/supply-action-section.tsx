import { Button } from "@/components/ui/button";
import { ButtonWallet } from "@/components/ui/button-wallet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAccount } from "wagmi";

export function SupplyAction() {
	const { isConnected } = useAccount();
	const [amount, setAmount] = useState(0);
	const [amountMarket, setAmountMarket] = useState(0);
	return (
		<Tabs defaultValue="limit" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger
					className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-600"
					value="limit"
				>
					Limit
				</TabsTrigger>
				<TabsTrigger
					className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-600"
					value="market"
				>
					Market
				</TabsTrigger>
			</TabsList>
			<TabsContent value="limit">
				<Card className="border-0 shadow-none p-0">
					<CardContent className="space-y-2 p-0 my-3">
						<div className="space-y-2 text-lg">
							<div className="flex justify-between items-center mb-6">
								<Label htmlFor="amount-limit" className="max-w-sm text-clip">
									Available On Wallet
								</Label>
								<Input
									id="amount-limit"
									value="98.8 ETH"
									disabled
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<div className="flex justify-between items-center">
								<Label htmlFor="rate-limit">Fixed Rate</Label>
								<Input
									id="rate-limit"
									value="3.5%"
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<br />
							<div className="flex items-center justify-between gap-2">
								<Label htmlFor="amount-limit">Amount</Label>
								<div className="relative flex items-center">
									<Input
										id="amount-limit"
										value={amount}
										onChange={(e) => setAmount(Number(e.target.value) || 0)}
										className="w-48 text-right border-0 text-gray-900 pr-14"
									/>
									<span className="absolute right-3 text-gray-500 text-sm">
										USDC
									</span>
								</div>
							</div>
							<Slider
								value={[amount]}
								max={100}
								step={1}
								onValueChange={(value) => setAmount(value[0])}
							/>
							<div className="flex justify-end w-full">
								<button
									className="text-xs bg-gray-100 p-1 rounded-sm"
									type="button"
									onClick={() => setAmount(100)}
								>
									Max
								</button>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-0 pr-3">
						{isConnected ? (
							<Button type="button" className="w-full">
								Place Order
							</Button>
						) : (
							<div className="w-full">
								<ButtonWallet className="rounded-md w-full" />
							</div>
						)}
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="market">
				<Card className="border-0 shadow-none p-0">
					<CardContent className="space-y-2 p-0 my-3">
						<div className="space-y-2 text-lg">
							<div className="flex justify-between items-center mb-6">
								<Label htmlFor="amount-limit" className="max-w-sm text-clip">
									Available On Wallet
								</Label>
								<Input
									id="amount-limit"
									value="98.8 ETH"
									disabled
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<div className="flex justify-between items-center">
								<Input
									id="price-market"
									value="98.8"
									className="w-24 hidden text-right border-0 text-gray-900"
								/>
							</div>
							<div className="flex justify-between items-center">
								<Label htmlFor="rate-market">Fixed Rate</Label>
								<Input
									id="rate-market"
									value="3.5%"
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<br />
							<div className="flex items-center justify-between gap-2">
								<Label htmlFor="amount-market">Amount</Label>
								<div className="relative flex items-center">
									<Input
										id="amount-market"
										value={amountMarket}
										onChange={(e) =>
											setAmountMarket(Number(e.target.value) || 0)
										}
										className="w-48 text-right border-0 text-gray-900 pr-14"
									/>
									<span className="absolute right-3 text-gray-500 text-sm">
										USDC
									</span>
								</div>
							</div>
							<Slider
								value={[amountMarket]}
								max={100}
								step={1}
								onValueChange={(value) => setAmountMarket(value[0])}
							/>
							<div className="flex justify-end w-full">
								<button
									className="text-xs bg-gray-100 p-1 rounded-sm"
									type="button"
									onClick={() => setAmountMarket(100)}
								>
									Max
								</button>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-0 pr-3">
						{isConnected ? (
							<Button type="button" className="w-full">
								Place Order
							</Button>
						) : (
							<div className="w-full">
								<ButtonWallet className="rounded-md w-full" />
							</div>
						)}
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
