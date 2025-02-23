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
};

const OrderBookChart: React.FC<OrderBookChartProps> = ({ data }) => {
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
				},
				grid: {
					drawTicks: false,
				},
			},
			y: {
				title: {
					display: true,
					text: "APY (%)",
				},
				beginAtZero: true,
				grid: {
					drawTicks: false,
				},
			},
		},
	};

	return (
		<div>
			<div className="mb-6 pl-6">
				<h2 className="text-xl font-semibold text-gray-900">Yield Curve</h2>
			</div>
			<Line data={data} options={options} />
		</div>
	);
};

export default OrderBookChart;
