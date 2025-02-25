// import { getAvailableTokens } from "@/utils/api";
import { getAvailableTokens } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useAvailableTokens = () => {
	const {
		data: availableTokens,
		isLoading: isAvailableTokenLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["available-tokens"],
		queryFn: () => getAvailableTokens(),
		staleTime: 1000 * 60 * 5,
	});

	return { availableTokens, isAvailableTokenLoading, isError, error };
};
