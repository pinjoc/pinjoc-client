import { ButtonWallet } from "./button-wallet";

const Navbar = () => {
	return (
		<header className="h-20 border-b border-b-primary flex items-center">
			<div className="container mx-auto">
				<nav className="flex items-center justify-between">
					<h1 className="text-5xl font-bold text-white">PINJ 🪙 C</h1>
					<ButtonWallet className="text-sm" />
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
