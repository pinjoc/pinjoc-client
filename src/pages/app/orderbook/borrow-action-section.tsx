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
import { useApprove } from "@/hooks/use-approve";

export function BorrowAction() {
	const { state, dispatch } = useCLOBState();
	const { isConnected, address } = useAccount();
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

	const { approve, isApproving } = useApprove({
		onSuccess: (result) => {
			console.log("Order placed successfully:", result);
		},
		onError: (error) => {
			console.error("Error placing order:", error);
		},
	});

	// const handleClick = async () => {
	//   try {
	//     await placeOrder({
	//       debtToken: state.token.debtAddress as `0x${string}`,
	//       collateralToken: state.token.collateralAddress as `0x${string}`,
	//       amount: BigInt(1000000000),
	//       collateralAmount: BigInt(10000000000000000000),
	//       rate: BigInt(70000000000000000),
	//       maturity: BigInt(9999999999999999999999999999999),
	//       maturityMonth: "MAY",
	//       maturityYear: BigInt(2025),
	//       lendingOrderType: 1,
	//     });
	//   } catch (error) {
	//     console.error("Failed to place order:", error);
	//   }
	// };

	// const {
	// 	balance: debtBalance,
	// 	// error: debtError,
	// 	// loading: debtLoading,
	// } = useBalance(address!, state.token.debtAddress as `0x${string}`);

	const {
		balance: collateralBalance,
		// error: collateralError,
		// loading: collateralLoading,
	} = useBalance(address!, state.token.collateralAddress as `0x${string}`);

	const handlePlaceOrder = async () => {
		// const hashApprove = await writeContract(config, {
		//   abi: placeOrderAbi,
		//   address: state.token.debtAddress as `0x${string}`,
		//   functionName: "approve",
		//   args: ["0x6f79Ec0beD0b721750477778B25f02Ac104b8F77", _amount],
		// });

		await approve({
			amount: BigInt(collateralLimit) * BigInt(10 ** 8),
			spender: "0x6f79Ec0beD0b721750477778B25f02Ac104b8F77",
			address: state.token.collateralAddress as `0x${string}`,
		});
		// await waitForTransaction(config, { hash: hashApprove });
		await placeOrder({
			debtToken: state.token.debtAddress as `0x${string}`,
			collateralToken: state.token.collateralAddress as `0x${string}`,
			amount: BigInt(debtLimit) * BigInt(10 ** 6),
			collateralAmount: BigInt(collateralLimit) * BigInt(10 ** 18), //decimal
			rate: BigInt(500000000000),
			maturity: BigInt(1748449527),
			maturityMonth: state.maturity.month,
			maturityYear: BigInt(state.maturity.year),
			lendingOrderType: 1,
		});
	};

	return (
		<Tabs
			value={state.isMarket ? "market" : "limit"}
			onValueChange={(value) => {
				if (value === "market") {
					dispatch({
						type: "SET_FIXED_RATE",
						payload: state.bestRate,
					});
					dispatch({
						type: "SET_MAX_AMOUNT",
						payload: state.bestRateAmount,
					});
					dispatch({
						type: "SET_IS_MARKET",
						payload: true,
					});
				} else {
					dispatch({
						type: "SET_FIXED_RATE",
						payload: state.orderbookFixedRate,
					});
					dispatch({
						type: "SET_MAX_AMOUNT",
						payload: state.maxAmount,
					});
					dispatch({
						type: "SET_IS_MARKET",
						payload: false,
					});
				}
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
											value={collateralLimit.toLocaleString("id-ID")}
											onChange={(e) => {
												const max = state.bestRateAmount;
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
									max={Number(collateralBalance)}
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
											value={debtLimit.toLocaleString("id-ID")}
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
										Max {state.maxAmount}
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
								onClick={handlePlaceOrder}
								disabled={isPlacing || collateralLimit === 0 || debtLimit === 0}
							>
								{isPlacing || isApproving ? "Loading" : "Place Order"}
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
											value={collateralLimit.toLocaleString("id-ID")}
											onChange={(e) => {
												const max = state.bestRateAmount;
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
									max={Number(collateralBalance)}
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
									<Label htmlFor="debt-market">Borrow</Label>
									<div className="relative flex items-center">
										<Input
											id="debt-market"
											value={debtLimit.toLocaleString("id-ID")}
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
										onClick={() => setCollateralLimit(state.maxAmount)}
									>
										Max {state.maxAmount}
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
								onClick={handlePlaceOrder}
								disabled={isPlacing}
							>
								{isPlacing || isApproving ? "Loading" : "Place Order"}
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
