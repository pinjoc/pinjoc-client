import { useState, useCallback } from "react";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { toast } from "sonner";
import { TransactionReceipt } from "viem";
import { placeOrderAbi } from "@/abis/pinjoc/place-order-abi";
import { config } from "@/lib/wallet";

interface ApproveParams {
	spender: `0x${string}`;
	amount: bigint;
	address: `0x${string}`;
}

export interface ApproveResult {
	transactionHash: string;
	receipt: TransactionReceipt;
}

interface UseApproveOptions {
	onSuccess?: (result: ApproveResult) => void;
	onError?: (error: Error) => void;
}

interface UseApproveReturn {
	approve: (params: ApproveParams) => Promise<ApproveResult>;
	isApproving: boolean;
	error: Error | null;
}

export const useApprove = (
	options: UseApproveOptions = {},
): UseApproveReturn => {
	const { onSuccess, onError } = options;
	const [isApproving, setIsApproving] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const approve = useCallback(
		async ({
			spender,
			amount,
			address,
		}: ApproveParams): Promise<ApproveResult> => {
			setIsApproving(true);
			setError(null);
			toast.loading("Processing approval...");

			try {
				const hash = await writeContract(config, {
					abi: placeOrderAbi,
					address: address,
					functionName: "approve",
					args: [spender, amount],
				});

				const receipt = await waitForTransaction(config, { hash });

				const approveResult: ApproveResult = {
					transactionHash: hash,
					receipt,
				};

				toast.dismiss();
				toast.success("Approval successful! ✅");
				onSuccess?.(approveResult);
				return approveResult;
			} catch (err: unknown) {
				const error =
					err instanceof Error
						? err
						: new Error("Failed to approve transaction");
				setError(error);
				toast.dismiss();
				toast.error("Approval failed ❌");
				onError?.(error);
				throw error;
			} finally {
				setIsApproving(false);
			}
		},
		[onSuccess, onError],
	);

	return {
		approve,
		isApproving,
		error,
	};
};
