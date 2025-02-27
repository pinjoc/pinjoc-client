import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchMaturity = async (): Promise<string> => {
	return Promise.resolve("March2025");
};

// Custom hook to manage the maturity state
export const useMaturity = () => {
	return useQuery<string, Error>({
		queryKey: ["maturity"],
		queryFn: fetchMaturity,
		staleTime: 1000 * 60 * 5,
	});
};

export const useUpdateMaturity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newMaturity: string) => {
			return Promise.resolve(newMaturity);
		},
		onSuccess: (newMaturity) => {
			queryClient.setQueryData<string>(["maturity"], newMaturity);
		},
	});
};
