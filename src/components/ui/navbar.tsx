import { ButtonWallet } from "./button-wallet";

const Navbar = () => {
	return (
		<header>
			<nav className="flex items-center justify-end h-52">
				<ButtonWallet />
			</nav>
		</header>
	);
};

export default Navbar;
