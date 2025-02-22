import { PropsWithChildren } from "react";
import { ButtonWallet } from "../ui/button-wallet";

const V2_AppLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col items-center h-screen bg-white">
			{/* Header */}
			<header className="w-full p-6 bg-white shadow-md flex justify-between items-center rounded-t-lg">
				<h1 className="text-2xl font-bold text-gray-600">PINJ🪙C</h1>
				<ButtonWallet className="text-sm" />
			</header>

			<hr className="border-t border-gray-300" />

			{/* Main Content */}
			<main className="w-full flex-grow bg-white shadow-lg overflow-y-hidden">
				{children}
			</main>

			<hr className="border-t border-gray-300" />

			{/* Footer */}
			<footer className="w-full p-6 bg-white text-sm shadow-md text-center text-gray-400 rounded-b-lg">
				&copy; {new Date().getFullYear()} PINJ🪙C
			</footer>
		</div>
	);
};

export default V2_AppLayout;
