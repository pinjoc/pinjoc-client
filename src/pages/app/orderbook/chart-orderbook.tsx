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
import { maturityList } from ".";
import { useCLOBState } from "./clob-state";
import { fetchCLOBMaturityBestRateData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

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

const OrderBookChart = () => {
	const { state, dispatch } = useCLOBState();

	const { data: dataChart } = useQuery({
		queryKey: [
			"clobData",
			state.token.collateralAddress,
			state.token.debtAddress,
		],
		queryFn: () =>
			fetchCLOBMaturityBestRateData(
				state.token.collateralAddress!,
				state.token.debtAddress!,
			),
		staleTime: 1000 * 60 * 5,
	});

	const data: ChartData = {
		labels: maturityList,
		datasets: [
			{
				label: "APY",
				data: (dataChart || [])?.map((d) => +d.BestRate),
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
				tension: 0.4,
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		layout: {
			padding: 20,
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
				const v = maturityList[elements[0].index];
				const month = v.slice(0, 3);
				const year = v.slice(3);
				dispatch({ type: "SET_MATURITY_MONTH", payload: month });
				dispatch({ type: "SET_MATURITY_YEAR", payload: year });
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
