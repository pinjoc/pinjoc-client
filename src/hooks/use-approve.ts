import { useState, useCallback } from "react";
import { writeContract } from "@wagmi/core";
import { placeOrderAbi } from "@/abis/pinjoc/place-order-abi";

interface UseApproveOptions {
	onSuccess?: (hash: string) => void;
	onError?: (error: Error) => void;
}

interface ApproveParams {
	spender: string;
	amount: bigint;
}

const useApprove = (
	config: any,
	{ onSuccess, onError }: UseApproveOptions = {},
) => {
	const [isApproving, setIsApproving] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const approve = useCallback(
		async ({ spender, amount }: ApproveParams) => {
			setIsApproving(true);
			setError(null);

			try {
				const hashApprove = await writeContract(config, {
					abi: placeOrderAbi,
					address: "0x0F848482cC12EA259DA229e7c5C4949EdA7E6475",
					functionName: "approve",
					args: [spender, amount],
				});

				onSuccess?.(hashApprove);
				return hashApprove;
			} catch (err) {
				const error =
					err instanceof Error ? err : new Error("Transaction failed");
				setError(error);
				onError?.(error);
				throw error;
			} finally {
				setIsApproving(false);
			}
		},
		[config, onSuccess, onError],
	);

	return { approve, isApproving, error };
};

export default useApprove;
