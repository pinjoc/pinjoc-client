import { GroupPoolProps, PoolWithMaturityProps } from "./type";

const mockMaturities = [
	"March2025",
	"June2025",
	"September2025",
	"December2025",
];

const createMockPool = (
	type: string,
	maturity: string,
): PoolWithMaturityProps => ({
	price: Math.floor(Math.random() * 100) + 50, // Random price between 50 and 150
	apy: Number.parseFloat((Math.random() * 10).toFixed(2)), // Random APY between 0 and 10
	amount: Math.floor(Math.random() * 1000) + 100, // Random amount between 100 and 1100
	type,
	maturity,
});

const createMockGroupPool = (maturity: string): GroupPoolProps => ({
	supplies: Array.from({ length: 3 }, () => createMockPool("supply", maturity)),
	borrows: Array.from({ length: 3 }, () => createMockPool("borrow", maturity)),
	settled: createMockPool("settled", maturity),
});

const mockGroupPools: Record<string, GroupPoolProps> = mockMaturities.reduce(
	(acc, maturity) => {
		acc[maturity] = createMockGroupPool(maturity);
		return acc;
	},
	{} as Record<string, GroupPoolProps>,
);

export default mockGroupPools;
