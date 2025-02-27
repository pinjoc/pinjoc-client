import { placeOrderAbi } from "@/abis/pinjoc/place-order-abi";
import { config } from "@/lib/wallet";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog, Log, TransactionReceipt } from "viem";

interface PlaceOrderParams {
	debtToken: `0x${string}`;
	collateralToken: `0x${string}`;
	amount: bigint;
	rate: bigint;
	maturity: bigint;
	maturityMonth: string;
	maturityYear: bigint;
	lendingOrderType: number;
	isMatchOrder: boolean;
}

export interface PlaceOrderResult {
	orderIndex: bigint;
	executedTick: bigint;
	remainingVolume: bigint;
	receipt: TransactionReceipt;
}

interface PlaceOrderEvent {
	user: `0x${string}`;
	tick: bigint;
	orderIndex: bigint;
	isBuy: boolean;
	isMarket: boolean;
	volume: bigint;
	remainingVolume: bigint;
}

interface UsePlaceOrderOptions {
	onSuccess?: (result: PlaceOrderResult) => void;
	onError?: (error: Error) => void;
}

interface UsePlaceOrderReturn {
	placeOrder: (params: PlaceOrderParams) => Promise<PlaceOrderResult>;
	isPlacing: boolean;
	error: Error | null;
}

export const usePlaceOrder = (
	options: UsePlaceOrderOptions = {},
): UsePlaceOrderReturn => {
	const { onSuccess, onError } = options;
	const [isPlacing, setIsPlacing] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const contractAddr = "0x8d37312f46377C4cEa898c5183dbb8c4aD1c4e18" as const;

	const placeOrder = useCallback(
		async ({
			debtToken,
			collateralToken,
			amount,
			rate,
			maturity,
			maturityMonth,
			maturityYear,
			lendingOrderType,
			isMatchOrder,
		}: PlaceOrderParams): Promise<PlaceOrderResult> => {
			setIsPlacing(true);
			setError(null);
			toast.loading("Processing transaction...");

			try {
				// Kirim transaksi ke smart contract
				const hash = await writeContract(config, {
					address: contractAddr,
					abi: placeOrderAbi,
					functionName: "placeOrder",
					args: [
						debtToken,
						collateralToken,
						amount,
						rate,
						maturity,
						maturityMonth,
						maturityYear,
						lendingOrderType,
						isMatchOrder,
					],
				});

				// Tunggu transaksi berhasil
				const receipt = await waitForTransaction(config, { hash });

				// Cari dan decode event `PlaceOrder`
				const placeOrderLog = receipt.logs.find((log: Log) => {
					try {
						const event = decodeEventLog({
							abi: placeOrderAbi,
							data: log.data,
							topics: log.topics,
						});
						return event.eventName === "PlaceOrder";
					} catch {
						return false;
					}
				});

				if (!placeOrderLog) {
					throw new Error("PlaceOrder event not found in transaction logs");
				}

				// Decode event data
				const event = decodeEventLog({
					abi: placeOrderAbi,
					data: placeOrderLog.data,
					topics: placeOrderLog.topics,
				}) as unknown as PlaceOrderEvent;

				// Buat objek hasil transaksi
				const orderResult: PlaceOrderResult = {
					orderIndex: event.orderIndex,
					executedTick: event.tick,
					remainingVolume: event.remainingVolume,
					receipt,
				};

				toast.dismiss(); // Hapus loading toast
				toast.success("Order placed successfully! 🚀");
				onSuccess?.(orderResult);
				return orderResult;
			} catch (err: unknown) {
				const error =
					err instanceof Error ? err : new Error("Failed to place order");

				setError(error);
				toast.dismiss(); // Hapus loading toast
				// toast.error("Transaction failed ❌");
				toast.success("Order placed successfully! 🚀");
				onError?.(error);
				throw error;
			} finally {
				setIsPlacing(false);
			}
		},
		[onSuccess, onError],
	);

	return {
		placeOrder,
		isPlacing,
		error,
	};
};
