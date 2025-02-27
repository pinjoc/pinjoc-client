import { Button } from "@/components/ui/button";
import { ButtonWallet } from "@/components/ui/button-wallet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useCLOBState } from "./clob-state";
import { cn } from "@/lib/utils";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useBalance } from "@/hooks/use-balance";

export function BorrowAction() {
	const { state, dispatch } = useCLOBState();
	const { isConnected, address } = useAccount();
	const [collateralMarket, setCollacteralMarket] = useState(0);
	const [debtMarket, setDebtMarket] = useState(0);
	const [debtLimit, setDebtLimit] = useState(0);
	const [collateralLimit, setCollateralLimit] = useState(0);

	const { placeOrder, isPlacing } = usePlaceOrder({
		onSuccess: (result) => {
			console.log("Order placed successfully:", result);
		},
		onError: (error) => {
			console.error("Error placing order:", error);
		},
	});

	const handleClick = async () => {
		try {
			await placeOrder({
				debtToken: state.token.debtAddress as `0x${string}`,
				collateralToken: state.token.collateralAddress as `0x${string}`,
				amount: BigInt(1000000000),
				rate: BigInt(60000000000000000),
				maturity: BigInt(9999999999999999999999999999999),
				maturityMonth: "MAY",
				maturityYear: BigInt(2025),
				lendingOrderType: 1,
				isMatchOrder: false,
			});
		} catch (error) {
			console.error("Failed to place order:", error);
		}
	};

	const {
		balance: debtBalance,
		// error: debtError,
		// loading: debtLoading,
	} = useBalance(address!, state.token.debtAddress as `0x${string}`);

	const {
		balance: collateralBalance,
		// error: collateralError,
		// loading: collateralLoading,
	} = useBalance(address!, state.token.collateralAddress as `0x${string}`);

	return (
		<Tabs
			defaultValue="limit"
			onValueChange={(value) => {
				if (value === "market")
					dispatch({ type: "SET_FIXED_RATE", payload: state.bestRate });
				else
					dispatch({
						type: "SET_FIXED_RATE",
						payload: state.orderbookFixedRate,
					});
			}}
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-2 bg-transparent">
				<TabsTrigger
					className="data-[state=active]:bg-[#22232E] border-gray-500 data-[state=active]:text-white"
					value="limit"
				>
					Limit
				</TabsTrigger>
				<TabsTrigger
					className="data-[state=active]:bg-[#22232E] border-gray-500 data-[state=active]:text-white"
					value="market"
				>
					Market
				</TabsTrigger>
			</TabsList>
			<TabsContent value="limit">
				<Card className="border-0 shadow-none bg-[#22232E] p-3 text-white">
					<CardContent className="space-y-2 p-0 my-3">
						<div className="space-y-2 text-lg">
							<div className="flex justify-between items-center">
								<Label htmlFor="rate-limit">Fixed Rate</Label>
								<Input
									id="rate-limit"
									value={`${state.fixedRate}%`}
									className="w-24 text-right border-0 text-white bg-transparent"
								/>
							</div>
							<br />
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-2">
									<Label htmlFor="collateral-limit">Collateral</Label>
									<div className="relative flex items-center">
										<Input
											id="collateral-limit"
											value={collateralLimit}
											onChange={(e) => {
												const max = state.maxAmount;
												const value = Number(e.target.value) || 0;
												setCollateralLimit(value > max ? max : value);
											}}
											className={cn(
												"w-48 text-right border-0 text-white bg-transparent pr-14",
												collateralLimit > state.maxAmount &&
													"border border-red-500",
											)}
										/>
										<span className="absolute right-3 text-gray-500 text-sm">
											{state.token.collateral}
										</span>
									</div>
								</div>
								<Slider
									value={[collateralLimit]}
									max={state.maxAmount}
									step={1}
									onValueChange={(value) => setCollateralLimit(value[0])}
								/>
								<div className="flex justify-end w-full">
									<button
										className="text-xs bg-gray-900 p-1 rounded-sm"
										type="button"
										onClick={() => setCollateralLimit(state.maxAmount)}
									>
										Max {collateralBalance?.toString()}
									</button>
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-2">
									<Label htmlFor="debt-limit">Borrow</Label>
									<div className="relative flex items-center">
										<Input
											id="debt-limit"
											value={debtLimit}
											onChange={(e) => {
												const max = state.maxAmount;
												const value = Number(e.target.value) || 0;
												setDebtLimit(value > max ? max : value);
											}}
											className={cn(
												"w-48 text-right border-0 text-white bg-transparent pr-14",
												debtLimit > state.maxAmount && "border border-red-500",
											)}
										/>
										<span className="absolute right-3 text-gray-500 text-sm">
											{state.token.debt}
										</span>
									</div>
								</div>
								<Slider
									value={[debtLimit]}
									max={state.maxAmount}
									step={1}
									onValueChange={(value) => setDebtLimit(value[0])}
								/>
								<div className="flex justify-end w-full">
									<button
										className="text-xs bg-gray-900 p-1 rounded-sm"
										type="button"
										onClick={() => setDebtLimit(state.maxAmount)}
									>
										Max {debtBalance?.toString()}
									</button>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-0 pr-3">
						{isConnected ? (
							<Button
								type="button"
								className="w-full text-black"
								onClick={handleClick}
								disabled={isPlacing}
							>
								{isPlacing ? "Loading" : "Place Order"}
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
				<Card className="border-0 shadow-none bg-[#22232E] p-3 text-white">
					<CardContent className="space-y-2 p-0 my-3">
						<div className="space-y-2 text-lg">
							<div className="flex justify-between items-center">
								<Input
									id="price-market"
									defaultValue="98.8"
									className="w-24 hidden text-right border-0 text-white bg-transparent"
								/>
							</div>
							<div className="flex justify-between items-center">
								<Label htmlFor="rate-market">Fixed Rate</Label>
								<Input
									id="rate-market"
									value={`${state.fixedRate}%`}
									className="w-24 text-right border-0 text-white bg-transparent"
								/>
							</div>
							<br />
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-2">
									<Label htmlFor="collateral-market">Collateral</Label>
									<div className="relative flex items-center">
										<Input
											id="collateral-market"
											value={collateralMarket}
											onChange={(e) => {
												const max = state.maxAmount;
												const value = Number(e.target.value) || 0;
												setCollacteralMarket(value > max ? max : value);
											}}
											className={cn(
												"w-48 text-right border-0 text-white bg-transparent pr-14",
												collateralMarket > state.maxAmount &&
													"border border-red-500",
											)}
										/>
										<span className="absolute right-3 text-gray-500 text-sm">
											{state.token.collateral}
										</span>
									</div>
								</div>
								<Slider
									value={[collateralMarket]}
									max={state.maxAmount}
									step={1}
									onValueChange={(value) => setCollacteralMarket(value[0])}
								/>
								<div className="flex justify-end w-full">
									<button
										className="text-xs bg-gray-900 p-1 rounded-sm"
										type="button"
										onClick={() => setCollateralLimit(state.maxAmount)}
									>
										Max {collateralBalance?.toString()}
									</button>
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between gap-2">
									<Label htmlFor="debt-market">Borrow</Label>
									<div className="relative flex items-center">
										<Input
											id="debt-market"
											value={debtMarket}
											onChange={(e) => {
												const max = state.maxAmount;
												const value = Number(e.target.value) || 0;
												setDebtMarket(value > max ? max : value);
											}}
											className={cn(
												"w-48 text-right border-0 text-white bg-transparent pr-14",
												debtMarket > state.maxAmount && "border border-red-500",
											)}
										/>
										<span className="absolute right-3 text-gray-500 text-sm">
											{state.token.debt}
										</span>
									</div>
								</div>
								<Slider
									value={[debtMarket]}
									max={state.maxAmount}
									step={1}
									onValueChange={(value) => setDebtMarket(value[0])}
								/>
								<div className="flex justify-end w-full">
									<button
										className="text-xs bg-gray-900 p-1 rounded-sm"
										type="button"
										onClick={() => setCollateralLimit(state.maxAmount)}
									>
										Max {debtBalance?.toString()}
									</button>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="p-0 pr-3">
						{isConnected ? (
							<Button
								type="button"
								className="w-full text-black"
								onClick={handleClick}
							>
								{isPlacing ? "Loading" : "Place Order"}
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
