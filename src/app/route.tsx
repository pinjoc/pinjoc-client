import DynamicApyPage from "@/pages/dynamic-apy-page";
import LandingPage from "@/pages/landing-page";
import TokenizebondPage from "@/pages/tokenize-bond-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/dynamic-apy" element={<DynamicApyPage />} />
				<Route path="/tokenizebond" element={<TokenizebondPage />} />
			</Routes>
		</BrowserRouter>
	);
};
