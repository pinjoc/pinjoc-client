import { fetchCLOBData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCLOBQuery = () => {
	const [collateralAddress, setCollateralAddress] = useState<string>();
	const [debtTokenAddress, setDebtTokenAddress] = useState<string>();
	const [month, setMonth] = useState<string>();
	const [year, setYear] = useState<string>();

	const { data, error, isLoading } = useQuery({
		queryKey: ["clobData", collateralAddress, debtTokenAddress, month, year],
		queryFn: () =>
			fetchCLOBData(collateralAddress!, debtTokenAddress!, month!, year!),
		enabled: !!collateralAddress && !!debtTokenAddress && !!month && !!year,
		staleTime: 1000 * 60 * 5,
	});

	return {
		data,
		error,
		isLoading,
		collateralAddress,
		debtTokenAddress,
		month,
		year,
		setCollateralAddress,
		setDebtTokenAddress,
		setMonth,
		setYear,
	};
};
