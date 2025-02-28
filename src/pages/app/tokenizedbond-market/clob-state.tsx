import { TokenizedBonds } from "@/types";
import { fetchCLOBData, fetchCLOBBestPrice } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React, {
	createContext,
	useContext,
	useReducer,
	Dispatch,
	useMemo,
	useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { PoolProps } from "./type";

interface State {
	isMarket: boolean;
	bestRateAmount: number;
	orderbookBestRateAmount: number;
	fixedRate: number;
	orderbookFixedRate: number;
	maxAmount: number;
	bestRate: number;
	supply: PoolProps[];
	borrow: PoolProps[];
	settled: number;
	token: {
		base: string;
		quote: string;
		baseAddress: string;
		quoteAddress: string;
	};
	maturity: {
		month: string;
		year: string;
	};
}

type Action =
	| { type: "SET_BEST_RATE_AMOUNT"; payload: number }
	| { type: "SET_IS_MARKET"; payload: boolean }
	| { type: "SET_BEST_RATE_AMOUNT_ORDERBOOK"; payload: number }
	| { type: "SET_FIXED_RATE"; payload: number }
	| { type: "SET_CLOB_FIXED_RATE"; payload: number }
	| { type: "SET_MAX_AMOUNT"; payload: number }
	| { type: "SET_COLLATERAL_TOKEN"; payload: string }
	| { type: "SET_MATURITY_MONTH"; payload: string }
	| { type: "SET_MATURITY_YEAR"; payload: string }
	| { type: "SET_DEBT_TOKEN"; payload: string }
	| { type: "SET_BEST_RATE"; payload: number }
	| { type: "SET_DEBT_TOKEN_ADDRESS"; payload: string }
	| { type: "SET_COLLATERAL_TOKEN_ADDRESS"; payload: string }
	| { type: "SET_SUPPLY"; payload: PoolProps[] }
	| { type: "SET_BORROW"; payload: PoolProps[] }
	| { type: "SET_SETTLED"; payload: number };

interface CLOBStateContextType {
	state: State;
	dispatch: Dispatch<Action>;
}

const initialState: State = {
	isMarket: false,
	bestRateAmount: 0,
	orderbookBestRateAmount: 0,
	fixedRate: 0,
	orderbookFixedRate: 0,
	maxAmount: 0,
	bestRate: 0,
	supply: [],
	borrow: [],
	settled: 0,
	maturity: { month: "MAY", year: "2025" },
	token: { base: "", quote: "", baseAddress: "", quoteAddress: "" },
};

const CLOBStateContext = createContext<CLOBStateContextType | undefined>(
	undefined,
);

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_FIXED_RATE":
			return { ...state, fixedRate: action.payload };
		case "SET_CLOB_FIXED_RATE":
			return { ...state, orderbookFixedRate: action.payload };
		case "SET_IS_MARKET":
			return { ...state, isMarket: action.payload };
		case "SET_MAX_AMOUNT":
			return { ...state, maxAmount: action.payload };
		case "SET_DEBT_TOKEN":
			return { ...state, token: { ...state.token, base: action.payload } };
		case "SET_DEBT_TOKEN_ADDRESS":
			return {
				...state,
				token: { ...state.token, baseAddress: action.payload },
			};
		case "SET_MATURITY_MONTH":
			return {
				...state,
				maturity: { ...state.maturity, month: action.payload },
			};
		case "SET_MATURITY_YEAR":
			return {
				...state,
				maturity: { ...state.maturity, year: action.payload },
			};
		case "SET_COLLATERAL_TOKEN":
			return {
				...state,
				token: { ...state.token, quote: action.payload },
			};
		case "SET_COLLATERAL_TOKEN_ADDRESS":
			return {
				...state,
				token: { ...state.token, quoteAddress: action.payload },
			};
		case "SET_BEST_RATE":
			return { ...state, bestRate: action.payload };
		case "SET_SUPPLY":
			return { ...state, supply: action.payload };
		case "SET_BORROW":
			return { ...state, borrow: action.payload };
		case "SET_SETTLED":
			return { ...state, settled: action.payload };
		case "SET_BEST_RATE_AMOUNT":
			return { ...state, bestRateAmount: action.payload };
		case "SET_BEST_RATE_AMOUNT_ORDERBOOK":
			return { ...state, orderbookBestRateAmount: action.payload };
		default:
			return state;
	}
};

export const CLOBStateProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { address } = useParams<{ address?: string }>();

	const summary = useMemo(
		() => JSON.parse(atob(address || "")) as TokenizedBonds,
		[address],
	);
	console.log(summary);

	useEffect(() => {
		if (summary.MaturityRange) {
			const [month, year] = summary.MaturityRange.slice(0, 8).split(" ");
			dispatch({ type: "SET_MATURITY_MONTH", payload: month });
			dispatch({ type: "SET_MATURITY_YEAR", payload: year });
		}
	}, [summary.MaturityRange]);

	const { data } = useQuery({
		queryKey: [
			"clobData",
			summary.BaseTokenAddress,
			summary.QuoteTokenAddress,
			state.maturity.month,
			state.maturity.year,
		],
		queryFn: () =>
			fetchCLOBData(
				summary.BaseTokenAddress!,
				summary.QuoteTokenAddress!,
				state.maturity.month,
				state.maturity.year,
			),
		staleTime: 1000 * 60 * 5,
	});

	const { data: dataBestRate } = useQuery({
		queryKey: [
			"bestRate",
			summary.BaseTokenAddress,
			summary.QuoteTokenAddress,
			state.maturity.month,
			state.maturity.year,
		],
		queryFn: () =>
			fetchCLOBBestPrice(
				summary.BaseTokenAddress!,
				summary.QuoteTokenAddress!,
				state.maturity.month,
				state.maturity.year,
			),
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		if (data) {
			dispatch({
				type: "SET_SUPPLY",
				payload: data
					.filter((d) => d.OrderType === "LEND")
					.map((d) => ({
						amount: Number(d.AvailableToken),
						apy: Number(d.Rate),
						type: d.OrderType,
					})),
			});
			dispatch({
				type: "SET_BORROW",
				payload: data
					.filter((d) => d.OrderType === "BORROW")
					.map((d) => ({
						amount: Number(d.AvailableToken),
						apy: Number(d.Rate),
						type: d.OrderType,
					})),
			});
		}
		if (dataBestRate) {
			dispatch({
				type: "SET_SETTLED",
				payload: +(dataBestRate.best_rate || "0"),
			});
		}

		if (dataBestRate && data) {
			dispatch({
				type: "SET_BEST_RATE_AMOUNT",
				payload:
					(data || []).find((d) => +d.Rate === +dataBestRate.best_rate)
						?.AvailableToken || 0,
			});
		}
	}, [data, dataBestRate]);

	return (
		<CLOBStateContext.Provider value={{ state, dispatch }}>
			{children}
		</CLOBStateContext.Provider>
	);
};

export const useCLOBState = (): CLOBStateContextType => {
	const context = useContext(CLOBStateContext);
	if (!context)
		throw new Error("useCLOBState must be used within a CLOBStateProvider");
	return context;
};
