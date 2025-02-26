import { ApiClient } from "@/lib/api-client";
import { AvailableTokens, TokenizedBonds } from "@/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1",
);

export const getAvailableTokens = async () => {
	return api.get<AvailableTokens[]>("/clob/available-token");
};

export const getTokeninedBonds = async () => {
	return api.get<TokenizedBonds[]>("/token/available-token");
};
