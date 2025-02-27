import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export const ButtonWallet = ({
	className,
	...props
}: {
	className?: string;
}) => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && "loading";
				const connected = ready && account && chain;

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										className={cn(
											"group relative bg-primary rounded-full text-primary-foreground",
											className,
										)}
										onClick={openConnectModal}
										{...props}
									>
										Connect Wallet
										<div className="before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_5%,theme(colors.white/.3)_50%,transparent_50%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] group-hover:before:bg-[position:-100%_0,0_0] group-hover:before:duration-[2500ms] group-hover:rounded-full" />
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<button onClick={openChainModal} type="button">
										Wrong network
									</button>
								);
							}
							return (
								// <button
								//   type="button"
								//   className="group relative flex items-center h-full bg-[#4AFF01] corner-radius cursor-pointer"
								//   onClick={openAccountModal}
								// >
								//   <div className="relative py-3 px-6 text-xl font-bold tracking-wide text-black border-0 inline-flex items-center justify-center gap-3  overflow-hidden whitespace-nowrap focus:outline-none focus:ring focus:ring-[#4AFF01]/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-[#4AFF01]/50">
								//     <div className="flex items-center">
								//       <div>{account.displayName}</div>
								//     </div>
								//   </div>
								//   <div className="flex items-center gap-2 px-3 border-l">
								//     {chain.hasIcon && (
								//       <img
								//         src={chain.iconUrl}
								//         className="w-5 h-5"
								//         alt="chain"
								//       />
								//     )}
								//     <span className="text-black font-semibold">
								//       {account.displayBalance}
								//     </span>
								//   </div>
								//   {/* Shine effect */}
								//   <div className="before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_5%,theme(colors.white/.3)_50%,transparent_50%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] group-hover:before:bg-[position:-100%_0,0_0] group-hover:before:duration-[2500ms]" />
								// </button>
								<Button
									className={cn(
										"group relative bg-primary rounded-full text-primary-foreground",
										className,
									)}
									onClick={openAccountModal}
									{...props}
								>
									{account.displayName}
									{chain.hasIcon && (
										<>
											<span className="font-semibold">|</span>
											<img
												src={chain.iconUrl}
												className="w-5 h-5"
												alt="chain"
											/>
										</>
									)}
									<div className="before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_5%,theme(colors.white/.3)_50%,transparent_50%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] group-hover:before:bg-[position:-100%_0,0_0] group-hover:before:duration-[2500ms] group-hover:rounded-full" />
								</Button>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};
