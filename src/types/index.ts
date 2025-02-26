export interface AvailableTokens {
	BorrowVault: number;
	CollateralAddress: string;
	CollateralTokenIcon: string;
	CollateralTokenName: string;
	CollateralTokenSymbol: string;
	DebtTokenAddress: string;
	DebtTokenIcon: string;
	DebtTokenName: string;
	DebtTokenSymbol: string;
	LendingVault: string;
	MaturityRange: string;
	RateRange: string;
}

export interface TokenizedBonds {
	QuoteTokenName: string;
	QuoteTokenSymbol: string;
	QuoteTokenAddress: string;
	BaseTokenName: string;
	BaseTokenSymbol: string;
	BaseTokenAddress: string;
	PriceRange: string;
	MaturityRange: string;
	Volume24h: number;
}

export interface CLOBAvailable {
	Rate: string;
	AvailableToken: number;
	OrderType: string;
}
