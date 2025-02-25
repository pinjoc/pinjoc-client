import { ApiClient } from "@/lib/api-client";
import { AvailableTokens } from "@/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1/clob",
);

export const getAvailableTokens = async () => {
	return api.get<AvailableTokens[]>("/available-token");
};
