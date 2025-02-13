import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-black">Landing Page</h1>
			<Link to={"/dynamic-apy"}>
				<Button>Go to Dynamic APY</Button>
			</Link>
		</div>
	);
};

export default LandingPage;
