import GuestLayout from "@/components/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { IconCloud } from "@/components/ui/icon-cloud";
import Marquee from "@/components/ui/marquee";
import { TypingAnimation } from "@/components/ui/text-typing";
import { features, reviews, slugs } from "@/lib/constants";
import FeatureCard from "@/pages/app/home/feature-card";
import ReviewCard from "@/pages/app/home/review-card";
import { Link } from "react-router-dom";

const LandingPage = () => {
	const images = slugs.map(
		(slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
	);
	return (
		<GuestLayout>
			<section id="hero_section" className="flex items-center h-screen w-full">
				<div className="max-w-5xl w-full mx-auto">
					<div className="flex justify-between items-center">
						<div className="w-2/4">
							<div className="h-48">
								<TypingAnimation
									className="text-white text-5xl font-extralight leading-tight"
									duration={30}
								>
									A DeFi platform revolutionizing CLOB for borrowers and
									lenders.
								</TypingAnimation>
							</div>
							<span className="text-white mt-5 inline-block font-thin">
								enabling seamless, transparent, and decentralized debt trading.
							</span>
							<Link to={"/borrow-lend"} className="block mt-8">
								<Button className="rounded-full" size={"lg"}>
									Launch App
								</Button>
							</Link>
						</div>
						<IconCloud images={images} />
					</div>
				</div>
			</section>
			<section className="bg-gray-900">
				<div className="py-16">
					<div className="max-w-5xl w-full mx-auto pb-16">
						<h2 className="text-white text-5xl font-extralight leading-tight">
							What they say about us?
						</h2>
						<span className="text-white mt-5 inline-block font-thin w-1/2">
							We are a team of developers and designers who are passionate about
							building the future of decentralized finance.
						</span>
					</div>
					<Marquee>
						<div className="flex justify-center items-center gap-8">
							{reviews.map((review, index) => (
								<ReviewCard key={index} {...review} />
							))}
						</div>
					</Marquee>
					<Marquee direction="right">
						<div className="flex justify-center items-center gap-8">
							{reviews.map((review, index) => (
								<ReviewCard key={index} {...review} />
							))}
						</div>
					</Marquee>
				</div>
				<div className="max-w-5xl w-full mx-auto">
					<div className="text-right py-8">
						<h2 className="text-white text-5xl font-extralight leading-tight">
							We Deliver What Matters
						</h2>
						<span className="text-white mt-5 inline-block font-thin w-1/2">
							Just enjoyed to provide the best solutions for your needs.
						</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20">
						{features.map((feature) => (
							<FeatureCard
								key={feature.title}
								description={feature.description}
								icon={feature.icon}
								title={feature.title}
							/>
						))}
					</div>
				</div>
			</section>
			<section>
				<div className="max-w-5xl w-full mx-auto">
					<div className="text-center py-20">
						<h1 className="text-white mt-5 inline-block font-thin text-5xl leading-tight">
							We are a team of developers and designers who are passionate about
							building the future of{" "}
							<span className="bg-primary font-normal">
								decentralized finance
							</span>
							.
						</h1>
					</div>
				</div>
			</section>
		</GuestLayout>
	);
};

export default LandingPage;
