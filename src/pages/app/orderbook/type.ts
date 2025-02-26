export interface PoolProps {
	apy: number;
	amount: number;
	type: string;
}

export interface GroupPoolProps {
	supplies: Array<PoolProps>;
	borrows: Array<PoolProps>;
	settled?: PoolProps;
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
