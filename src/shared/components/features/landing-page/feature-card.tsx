import { Zap } from "lucide-react";

function FeatureCard({
	title,
	description,
	// icon,
}: {
	title: string;
	description: string;
	icon?: any;
}) {
	return (
		<div className="rounded-xl hover:bg-gray-800 transition-colors p-6 bg-white/10 cursor-pointer group">
			<div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/90 transition-colors">
				<Zap className="w-6 h-6 text-black" />
			</div>
			<h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
			<p className="text-gray-400">{description}</p>
		</div>
	);
}

export default FeatureCard;
