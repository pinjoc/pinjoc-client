import V2_AppLayout from "@/components/layouts/v2_app.layout";
import Stats from "./summary";
import Pool from "./orderbook";
import { ChartData, PoolProps } from "./type";
import OrderBookChart from "./chart-orderbook";
import { Action } from "./action-section";
import { useParams } from "react-router-dom";
import { AvailableTokens } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { fetchCLOBBestPrice, fetchCLOBData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function OrderbookPage() {
	const { address } = useParams<{ address?: string }>();
	const summary = useMemo(() => {
		return JSON.parse(atob(address || "")) as AvailableTokens;
	}, [address]);

	const [supply, setSupply] = useState<Array<PoolProps>>();
	const [borrow, setBorrow] = useState<Array<PoolProps>>();
	const [settled, setSettled] = useState<PoolProps>();

	const [month, year] = useMemo(() => {
		return summary.MaturityRange.slice(0, 8).split(" ");
	}, [summary.MaturityRange]);
	const { data } = useQuery({
		queryKey: [
			"clobData",
			summary.CollateralAddress,
			summary.DebtTokenAddress,
			month,
			year,
		],
		queryFn: () =>
			fetchCLOBData(
				summary.CollateralAddress!,
				summary.DebtTokenAddress!,
				month!,
				year!,
			),
		staleTime: 1000 * 60 * 5,
	});

	const { data: dataBestRate } = useQuery({
		queryKey: [
			"bestRate",
			summary.CollateralAddress,
			summary.DebtTokenAddress,
			month,
			year,
		],
		queryFn: () =>
			fetchCLOBBestPrice(
				summary.CollateralAddress!,
				summary.DebtTokenAddress!,
				month!,
				year!,
			),
		staleTime: 1000 * 60 * 5,
	});
	useEffect(() => {
		if (data) {
			const sup: PoolProps[] = data
				.filter((d) => d.OrderType === "LEND")
				.map((d) => ({
					amount: Number(d.AvailableToken),
					apy: Number(d.Rate),
					type: d.OrderType,
				}));

			const bor: PoolProps[] = data
				.filter((d) => d.OrderType === "BORROW")
				.map((d) => ({
					amount: Number(d.AvailableToken),
					apy: Number(d.Rate),
					type: d.OrderType,
				}));

			const bestPrice = {
				amount: 0,
				apy: +(dataBestRate?.best_rate || "0"),
				type: "SET",
			};

			setSettled(bestPrice);
			setSupply(sup);
			setBorrow(bor);
		}
	}, [data, dataBestRate]);

	const chartData: ChartData = {
		labels: ["Mar2025", "Jun2025", "Sep2025", "Dec2025"],
		datasets: [
			{
				label: "APY",
				data: [5, 7, 6, 8],
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
				tension: 0.4,
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};
	return (
		<V2_AppLayout>
			<Stats {...summary} />
			<div className="w-full grid grid-cols-4 overflow-x-hidden">
				<div className="col-span-2 p-6 border-r border-gray-300">
					<div>
						<OrderBookChart data={chartData} onPointClick={() => {}} />
					</div>
					<div className="mt-4">Position</div>
				</div>
				<div className="col-span-1 p-6 border-r border-gray-300">
					<Pool
						borrows={borrow || []}
						settled={settled}
						supplies={supply || []}
					/>
				</div>
				<div className="col-span-1 p-6">
					<Action />
				</div>
			</div>
		</V2_AppLayout>
	);
}
