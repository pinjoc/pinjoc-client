import { cn } from "@/lib/utils";

function ReviewCard({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) {
	return (
		<figure
			className={cn(
				"relative h-full bg-gray-600 text-white w-full cursor-pointer overflow-hidden rounded-xl py-4 px-3",
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img className="rounded-full" width="32" height="32" alt="" src={img} />
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">{username}</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
}

export default ReviewCard;
