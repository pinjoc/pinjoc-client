import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function BorrowAction() {
	const [amount, setAmount] = useState(0);
	return (
		<Tabs defaultValue="limit" className="w-[400px]">
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
						<div className="space-y-2 pl-1 pr-4 text-lg">
							<div className="flex justify-between items-center">
								<Label htmlFor="price">Bond Price</Label>
								<Input
									id="price"
									defaultValue="98.8"
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<div className="flex justify-between items-center">
								<Label htmlFor="rate">Fixed Rate</Label>
								<Input
									id="rate"
									defaultValue="3.5%"
									className="w-24 text-right border-0 text-gray-900"
								/>
							</div>
							<br />
							<div className="flex items-center justify-between gap-2">
								<Label htmlFor="amount">Amount</Label>
								<div className="relative flex items-center">
									<Input
										id="amount"
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
						<Button className="w-full">Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="market" />
		</Tabs>
	);
}
