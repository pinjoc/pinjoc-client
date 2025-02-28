import { placeOrderAbi } from "@/abis/pinjoc/place-order-abi";
import { pinjocRouterAddress } from "@/abis/pinjoc/token-abi";
import { config } from "@/lib/wallet";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog, Log, TransactionReceipt } from "viem";

interface PlaceOrderParams {
	debtToken: `0x${string}`;
	collateralToken: `0x${string}`;
	amount: bigint;
	collateralAmount: bigint;
	rate: bigint;
	maturity: bigint;
	maturityMonth: string;
	maturityYear: bigint;
	lendingOrderType: number;
}

export interface PlaceOrderResult {
	// orderIndex: bigint;
	// executedTick: bigint;
	// remainingVolume: bigint;
	event: PlaceOrderEvent;
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

	const placeOrder = useCallback(
		async ({
			debtToken,
			collateralToken,
			amount,
			collateralAmount,
			rate,
			maturity,
			maturityMonth,
			maturityYear,
			lendingOrderType,
		}: PlaceOrderParams): Promise<PlaceOrderResult> => {
			setIsPlacing(true);
			setError(null);
			toast.loading("Processing transaction...");

			try {
				// Kirim transaksi ke smart contract
				const hash = await writeContract(config, {
					address: pinjocRouterAddress,
					abi: placeOrderAbi,
					functionName: "placeOrder",
					args: [
						debtToken,
						collateralToken,
						amount,
						collateralAmount,
						rate,
						maturity,
						maturityMonth,
						maturityYear,
						lendingOrderType,
					],
				});

				// Tunggu transaksi berhasil
				const receipt = await waitForTransaction(config, { hash });

				// Cari dan decode event `PlaceOrder`
				const placeOrderLog = receipt.logs.find(
					(log: Log) =>
						log.address.toLowerCase() === pinjocRouterAddress.toLowerCase(),
				);

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
					// orderIndex: event.orderIndex,
					// executedTick: event.tick,
					// remainingVolume: event.remainingVolume,
					event,
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
