import { ApiClient } from "@/lib/api-client";
import { AvailableTokens, CLOBAvailable, TokenizedBonds } from "@/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1",
);

export const getAvailableTokens = async () => {
	return api.get<AvailableTokens[]>("/clob/available-token");
};

export const getTokeninedBonds = async () => {
	return api.get<TokenizedBonds[]>("/token/available-token");
};

export const fetchCLOBData = async (
	collateralAddress: string,
	debtTokenAddress: string,
	month: string,
	year: string,
) => {
	const params = {
		collateral_address: collateralAddress,
		debt_token_address: debtTokenAddress,
		month: month.toString(),
		year: +year,
	};
	return api.post<CLOBAvailable[]>("/clob/clob", params, {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
