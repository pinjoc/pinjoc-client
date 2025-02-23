export interface PoolProps {
	price: number;
	apy: number;
	amount: number;
	type: string;
}

export interface GroupPoolProps {
	supplies: Array<PoolProps>;
	borrows: Array<PoolProps>;
	settled: PoolProps;
}
