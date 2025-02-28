import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { ButtonWallet } from "./button-wallet";
import Logo from "./logo";

const AddressEmpty = () => {
	return (
		<div className="flex items-center justify-center">
			<Card className="bg-[#22232E] border-none w-96 p-0 py-4 px-3 rounded-md">
				<CardHeader>
					<h1 className="text-2xl font-semibold text-center text-white">
						PINJ
						<Logo />C
					</h1>
				</CardHeader>
				<CardContent className="text-white space-y-3 text-center font-light mt-8">
					<p className="font-semibold text-xl">Ship Together With Us🚀</p>
					<span className="text-sm">
						Experience higher yields, better rates, and expanded collateral
						options
					</span>
				</CardContent>
				<CardFooter className="flex flex-col gap-5 items-center justify-center mt-10">
					<span className="text-xs font-extralight text-white">
						Connect your wallet or email to continue
					</span>
					<ButtonWallet className="w-full" />
				</CardFooter>
			</Card>
		</div>
	);
};

export default AddressEmpty;
