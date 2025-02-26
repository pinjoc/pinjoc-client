/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils";

interface AvatarCollapseProps {
	className?: string;
	avatarUrls: string[];
}

export const AvatarCollapse = ({
	className,
	avatarUrls,
}: AvatarCollapseProps) => {
	return (
		<div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
			{avatarUrls.map((url, index) => (
				<img
					key={index}
					src={url}
					className="w-8 h-8"
					// width={40}
					// height={40}
					alt={`Avatar ${index + 1}`}
				/>
			))}
		</div>
	);
};
