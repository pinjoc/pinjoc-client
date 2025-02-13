import { PropsWithChildren, useEffect, useRef, useState } from "react";

type MarqueeAnimationType = (
	element: HTMLElement,
	elementWidth: number,
	windowWidth: number,
	direction: "left" | "right",
) => void;

const marqueeAnimation: MarqueeAnimationType = (
	element,
	elementWidth,
	windowWidth,
	direction,
) => {
	const startPosition = direction === "left" ? 0 : windowWidth - elementWidth;
	const endPosition = direction === "left" ? windowWidth - elementWidth : 0;

	element.animate(
		[
			{ transform: `translateX(${startPosition}px)` },
			{ transform: `translateX(${endPosition}px)` },
		],
		{
			duration: 6000,
			easing: "linear",
			direction: "alternate",
			iterations: Number.POSITIVE_INFINITY,
		},
	);
};

interface MarqueeProps extends PropsWithChildren {
	direction?: "left" | "right";
}

const Marquee = ({ children, direction = "left" }: MarqueeProps) => {
	const marqueeElementRef = useRef<HTMLDivElement>(null);
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		if (marqueeElementRef.current) {
			const elementWidth =
				marqueeElementRef.current.getBoundingClientRect().width;
			marqueeAnimation(
				marqueeElementRef.current as HTMLElement,
				elementWidth,
				windowWidth,
				direction,
			);
		}

		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [windowWidth, direction]);

	return (
		<div className="relative overflow-x-hidden">
			<div
				id="marquee"
				className="w-max whitespace-nowrap p-5 lg:p-7"
				ref={marqueeElementRef}
			>
				{children}
			</div>
		</div>
	);
};

export default Marquee;
