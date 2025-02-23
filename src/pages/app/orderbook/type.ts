export interface PoolProps {
	price: number;
	apy: number;
	amount: number;
	type: string;
}

export interface GroupPoolProps {
	supplies: Array<PoolWithMaturityProps>;
	borrows: Array<PoolWithMaturityProps>;
	settled?: PoolWithMaturityProps;
}

export interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		fill: boolean;
		backgroundColor: string;
		borderColor: string;
		tension: number;
		pointRadius: number;
		pointHoverRadius: number;
	}[];
}

export interface PoolWithMaturityProps extends PoolProps {
	maturity?: string;
}
