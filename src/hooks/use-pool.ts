import { PoolWithMaturityProps } from "@/pages/app/orderbook/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch or initialize the PoolWithMaturityProps state
const fetchPoolWithMaturity = async (): Promise<PoolWithMaturityProps[]> => {
	// Simulate fetching data (replace with actual on-chain or API call)
	return Promise.resolve([
		{
			price: 100,
			apy: 5,
			amount: 1000,
			type: "fixed",
			maturity: "March2025",
		},
		{
			price: 200,
			apy: 7,
			amount: 2000,
			type: "variable",
			maturity: "June2025",
		},
	]);
};

// Custom hook to manage the PoolWithMaturityProps state
export const usePoolWithMaturity = () => {
	return useQuery<PoolWithMaturityProps[], Error>({
		queryKey: ["poolWithMaturity"], // Unique key for this query
		queryFn: fetchPoolWithMaturity, // Function to fetch data
		staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
	});
};

// Hook to update the PoolWithMaturityProps state
export const useUpdatePoolWithMaturity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newPool: PoolWithMaturityProps) => {
			// Simulate an on-chain or API call to update the pool
			return Promise.resolve(newPool);
		},
		onSuccess: (newPool) => {
			// Update the cache with the new pool data
			queryClient.setQueryData<PoolWithMaturityProps[]>(
				["poolWithMaturity"],
				(oldData) => {
					if (!oldData) return [newPool];
					return [...oldData, newPool];
				},
			);
		},
	});
};
