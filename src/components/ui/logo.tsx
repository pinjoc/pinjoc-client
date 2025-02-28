import { cn } from "@/lib/utils";
import LogoImg from "../../assets/logo.png";

const Logo = ({
	width = 30,
	height = 30,
	className,
}: {
	width?: number;
	height?: number;
	className?: string;
}) => {
	return (
		<img
			src={LogoImg}
			alt="logo"
			width={width}
			height={height}
			className={cn("inline-block mb-1.5", className)}
		/>
	);
};

export default Logo;
