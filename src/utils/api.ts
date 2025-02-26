import { ApiClient } from "@/lib/api-client";
import { AvailableTokens, CLOBAvailable } from "@/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1/clob",
);

export const getAvailableTokens = async () => {
	return api.get<AvailableTokens[]>("/available-token");
};

export const fetchCLOBData = async (
	collateralAddress: string,
	debtTokenAddress: string,
	month: string,
	year: string,
) => {
	const data = {
		collateral_address: collateralAddress,
		debt_token_address: debtTokenAddress,
		month,
		year,
	};
	return api.get<CLOBAvailable[]>("/clob", data);
};
