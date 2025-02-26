import { getTokeninedBonds } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useTokenizedbond = () => {
	const {
		data: tokenizedbonds,
		isLoading: isTokenizedbondLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["tokenizedbond"],
		queryFn: () => getTokeninedBonds(),
		staleTime: 1000 * 60 * 5,
	});

	return { tokenizedbonds, isTokenizedbondLoading, isError, error };
};
