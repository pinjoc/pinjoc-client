import BorrowLendPage from "@/pages/app/borrow-lend/borrow-lend-page";
import LandingPage from "@/pages/app/home/landing-page";
import TokenizebondPage from "@/pages/app/tokenizebond/tokenize-bond-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderbookPage from "@/pages/app/orderbook";
import PortfolioPage from "@/pages/app/portfolio/portfolio-page";
import HistoryPage from "@/pages/app/history/history-page";
import TokenizedBondMarketPage from "@/pages/app/tokenizedbond-market";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/borrow-lend" element={<BorrowLendPage />} />
				<Route path="/tokenizebond" element={<TokenizebondPage />} />
				<Route path="/orderbook" element={<OrderbookPage />} />
				<Route path="/orderbook/:address" element={<OrderbookPage />} />
				<Route
					path="/tokenizedbond-market/:address"
					element={<TokenizedBondMarketPage />}
				/>
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/history" element={<HistoryPage />} />
			</Routes>
		</BrowserRouter>
	);
};
