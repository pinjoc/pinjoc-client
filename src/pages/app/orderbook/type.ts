export interface PoolProps {
	price: number;
	apy: number;
	amount: number;
	type: "borrow" | "supply";
}

export interface GroupPoolProps {
	supplies: Array<PoolProps>;
	borrows: Array<PoolProps>;
}
