import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { ChartData } from "./type";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

type OrderBookChartProps = {
	data: ChartData;
	onPointClick?: (pointIndex: number) => void;
};

const OrderBookChart: React.FC<OrderBookChartProps> = ({
	data,
	onPointClick,
}) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Maturity (Months)",
					color: "#ffff",
				},
				grid: {
					drawTicks: false,
				},
				ticks: {
					color: "#ffff",
				},
			},
			y: {
				title: {
					display: true,
					text: "APY (%)",
					color: "#ffff",
				},
				beginAtZero: true,
				ticks: {
					color: "#ffff",
				},
				grid: {
					drawTicks: false,
				},
			},
		},
		onClick: (_event: any, elements: any[]) => {
			if (elements.length > 0) {
				const pointIndex = elements[0].index;
				if (onPointClick) {
					onPointClick(pointIndex);
				}
			}
		},
	};

	return (
		<div>
			<div className="mb-6 pl-6">
				<h2 className="text-xl font-semibold text-white">Yield Curve</h2>
			</div>
			<Line data={data} options={options} />
		</div>
	);
};

export default OrderBookChart;
