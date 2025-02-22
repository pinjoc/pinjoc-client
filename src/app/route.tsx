import BorrowLendPage from "@/pages/borrow-lend-page";
import LandingPage from "@/pages/landing-page";
import TokenizebondPage from "@/pages/tokenize-bond-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderbookPage from "@/pages/app/orderbook";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/borrow-lend" element={<BorrowLendPage />} />
				<Route path="/tokenizebond" element={<TokenizebondPage />} />
				<Route path="/orderbook" element={<OrderbookPage />} />
			</Routes>
		</BrowserRouter>
	);
};
