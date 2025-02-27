import { useEffect, useState, useCallback, useRef } from "react";
import { config } from "@/lib/wallet";
import { tokenAbi } from "@/abis/pinjoc/token-abi";
import { readContract } from "@wagmi/core";
import { HexAddress } from "@/type";

interface UseBalanceOptions {
	debounceTime?: number;
	enabled?: boolean;
}

interface UseBalanceResult {
	balance: bigint | undefined;
	loading: boolean;
	error: Error | null;
	refreshBalance: () => Promise<void>;
	isStale: boolean;
}

export const useBalance = (
	address: HexAddress,
	token: HexAddress,
	options: UseBalanceOptions = {},
): UseBalanceResult => {
	const { debounceTime = 1000, enabled = true } = options;

	const [balance, setBalance] = useState<bigint | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [isStale, setIsStale] = useState(false);

	const debounceTimeRef = useRef(debounceTime);
	useEffect(() => {
		debounceTimeRef.current = debounceTime;
	}, [debounceTime]);

	const fetchBalance = useCallback(async () => {
		if (!address || !token || !enabled) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		setIsStale(false);

		try {
			const result = await readContract(config, {
				address: token,
				abi: tokenAbi,
				functionName: "balanceOf",
				args: [address],
			});

			const decimal = await readContract(config, {
				address: token,
				abi: tokenAbi,
				functionName: "decimals",
			});

			const divisor = BigInt(10) ** BigInt(decimal as number);
			const formattedBalance = (result as bigint) / divisor;

			setBalance(formattedBalance);
		} catch (err: unknown) {
			const error =
				err instanceof Error ? err : new Error("Failed to fetch balance");

			setError(error);
			console.error("Error fetching M0 balance:", error);
		} finally {
			setLoading(false);
		}
	}, [address, token, enabled]);

	const refreshBalance = useCallback(async () => {
		await fetchBalance();
	}, [fetchBalance]);

	useEffect(() => {
		setIsStale(true);
	}, [address, token]);

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval> | null = null;

		if (enabled) {
			fetchBalance();
			intervalId = setInterval(() => {
				refreshBalance();
			}, 5000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [fetchBalance, refreshBalance, enabled]);

	return {
		balance,
		loading,
		error,
		refreshBalance,
		isStale,
	};
};
