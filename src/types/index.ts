export interface AvailableTokens {
	DebtTokenName: string;
	DebtTokenSymbol: string;
	DebtTokenAddress: string;
	CollateralTokenName: string;
	CollateralTokenSymbol: string;
	CollateralAddress: string;
	MaturityRange: string;
	RateRange: string;
	LendingVault: number;
	BorrowVault: number;
}

export interface CLOBAvailable {
	Rate: string;
	AvailableToken: number;
	OrderType: string;
}
