import { PropsWithChildren } from "react";
import { ButtonWallet } from "../ui/button-wallet";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useScroll } from "motion/react";
import { CLOBStateProvider } from "@/pages/app/orderbook/clob-state";

const OrderbookLayout = ({ children }: PropsWithChildren) => {
	const isScrolled = useScroll();
	const location = useLocation();
	const { pathname } = location;
	return (
		<CLOBStateProvider>
			<div className="flex flex-col items-center bg-[#121323] overflow-y-scroll">
				{/* Header */}
				<header className="fixed w-full z-[99999]">
					<nav
						className={`absolute w-full transition-all duration-300 ${isScrolled ? "backdrop-blur-3xl" : ""}`}
					>
						<div className="container mx-auto">
							<div className="relative flex flex-wrap items-center justify-between gap-6 py-2 md:gap-0 md:py-4">
								<input
									type="checkbox"
									name="menu-toggle"
									id="menu-toggle"
									className="peer hidden"
								/>
								<div className="relative z-20 flex w-full items-center justify-between md:px-0 lg:w-max">
									<Link
										to={"/"}
										aria-label="logo"
										className="flex items-center"
									>
										<h1 className="text-3xl font-bold text-white">PINJ 🪙 C</h1>
									</Link>
									<div className="relative flex max-h-10 items-center lg:hidden">
										<label
											htmlFor="menu-toggle"
											aria-label="humburger"
											id="humburger"
											className="relative -mr-6 p-6"
										>
											<div
												aria-hidden="true"
												id="line"
												className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
											/>
											<div
												aria-hidden="true"
												id="line2"
												className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
											/>
										</label>
									</div>
								</div>
								<div
									aria-hidden="true"
									className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
								/>

								<div className="invisible absolute left-0 top-full z-20 w-full origin-top translate-y-1 scale-95 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 peer-checked:visible peer-checked:scale-100 peer-checked:opacity-100 lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none space-x-5 lg:dark:bg-transparent">
									<Link to={"/borrow-lend"}>
										<Button
											className={cn(
												" text-white cursor-pointer rounded-full font-extralight hover:bg-[#31323D]",
												pathname === "/borrow-lend"
													? "bg-[#31323D]"
													: "bg-transparent",
											)}
										>
											Borrow/Lend
										</Button>
									</Link>
									<Link to={"/tokenizebond"}>
										<Button
											className={cn(
												" text-white cursor-pointer rounded-full font-extralight hover:bg-[#31323D]",
												pathname === "/tokenizebond"
													? "bg-[#31323D]"
													: "bg-transparent",
											)}
										>
											Tokenized bond
										</Button>
									</Link>
									<Link to={"/portfolio"}>
										<Button
											className={cn(
												" text-white rounded-full font-extralight hover:bg-[#31323D]",
												pathname === "/portfolio"
													? "bg-[#31323D]"
													: "bg-transparent",
											)}
										>
											Portfolio
										</Button>
									</Link>
									<Link to={"/history"}>
										<Button
											className={cn(
												" text-white rounded-full font-extralight hover:bg-[#31323D]",
												pathname === "/history"
													? "bg-[#31323D]"
													: "bg-transparent",
											)}
										>
											History
										</Button>
									</Link>
									<ButtonWallet />
								</div>
							</div>
						</div>
					</nav>
				</header>

				<div className="h-20" />

				<hr className="border-t border-gray-300" />

				{/* Main Content */}
				<main className="w-full flex-grow border-t border-gray-300 bg-white shadow-lg overflow-x-hidden">
					{children}
				</main>

				{/* Footer */}
				<footer className="w-full p-6 bg-[#121323] border-t border-gray-300 text-sm shadow-md text-center text-gray-400 rounded-b-lg">
					&copy; {new Date().getFullYear()} PINJ🪙C
				</footer>
			</div>
		</CLOBStateProvider>
	);
};

export default OrderbookLayout;
